'use client'

import {
  Container,
  Box,
  Grid,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useEffect, useState } from 'react'
import EditButton from './EditButton'
import MainCard from './MainCard'
import SearchOption from './SearchOption'
import SelectSort from './SelectSort'
import SelectType from './SelectType'
import { defaultGetFetcher } from '@/api/fetchers'
import useSWR from 'swr'
import MainProfile from './MainProfile'
import MainShowcase from './MainShowcase'
import MainCarousel from './MainCarousel'
import { useSearchParams } from 'next/navigation'
import { useInfiniteScrollHook } from '@/hook/useInfiniteScroll'
import { IPost } from '@/types/IPostDetail'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'
import { AxiosInstance } from 'axios'
import { IPagination } from '@/types/IPagination'
import PwaInstallBanner from './PwaInstallBanner'
import PushAlertBanner from './PushAlertBanner'

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export type ProjectSort = 'latest' | 'hit'
export type ProjectType = 'STUDY' | 'PROJECT'
export interface IDetailOption {
  isInit?: boolean
  due: string
  region1: string
  region2: string
  place: string
  status: string
  tag: string
}

const MainPage = ({ initData }: { initData: IPagination<IPost[]> }) => {
  const [content, setContent] = useState<IPost[]>(initData?.content)
  const [page, setPage] = useState<number>(1)
  const [type, setType] = useState<ProjectType | undefined>(undefined) //'STUDY'
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [sort, setSort] = useState<ProjectSort | undefined>(undefined) //'latest'
  /* 추후 디자인 추가되면 schedule 추가하기 */
  const [detailOption, setDetailOption] = useState<IDetailOption>({
    isInit: true,
    due: '',
    region1: '',
    region2: '',
    place: '',
    status: '',
    tag: '',
  })
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword') ?? ''
  const { isLogin } = useAuthStore()
  const axiosInstance: AxiosInstance = useAxiosWithAuth()
  const [prevScrollHeight, setPrevScrollHeight] = useState<number | undefined>(
    undefined,
  )
  /* page가 1이면 서버가 가져온 데이터(initData)로 렌더링 */
  const pageSize = 6
  const {
    data: newData,
    isLoading,
    error,
  } = useSWR<IPagination<IPost[]>>(
    page == 1 && !type && !sort && detailOption.isInit && keyword == ''
      ? null
      : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=${
          type ?? 'STUDY'
        }&sort=${
          sort ?? 'latest'
        }&page=${page}&pageSize=${pageSize}&keyword=${keyword}&due=${
          detailOption.due
        }&region1=${detailOption.region1}&region2=${
          detailOption.region2
        }&place=${detailOption.place}&status=${detailOption.status}&tag=${
          detailOption.tag
        }`,
    isLogin
      ? (url: string) => axiosInstance.get(url).then((res) => res.data)
      : defaultGetFetcher,
  )

  useEffect(() => {
    if (!newData || !newData?.content) return
    //page가 1일 경우 == initData가 설정되어있을경우, 무한스크롤시 page는 무조건 2부터 시작함.
    //따라서 page가 1일 경우에는 옵션이 달라진 것임. 고로 무조건 새로운 데이터로 setContent를 해준다.
    if (page == 1) {
      setContent(newData.content)
      return
    }
    //여기서부터는 무한스크롤 영역. 길이가 0이면 더해주지 않는다.
    if (newData?.content.length == 0) return
    //이전 데이터와 새로운 데이터를 더해준다
    setContent([...content, ...newData.content])
    //이전 스크롤 높이로 설정
    setPrevScrollHeight(target.current?.scrollHeight)
    if (target.current && prevScrollHeight)
      scrollTo(target.current.scrollHeight - prevScrollHeight)
  }, [newData])

  const { target, spinner, scrollTo } = useInfiniteScrollHook(
    setPage,
    isLoading,
    (newData?.last || initData?.last) ?? true, //isEnd
    page,
  )

  const handleType = (value: ProjectType) => {
    setType(value)
    //type이 변경될 경우 초기화
    setPage(1)
    setDetailOption({
      due: '',
      region1: '',
      region2: '',
      place: '',
      status: '',
      tag: '',
    })
    setSort('latest')
  }

  const handleSort = (value: ProjectSort) => {
    setSort(value)
    setPage(1)
  }

  const handleOption = (value: IDetailOption) => {
    setDetailOption(value)
    setPage(1)
  }

  return (
    <>
      <PushAlertBanner />
      {/* mobile view */}
      <div className="mobile-layout">
        <Container>
          <Box sx={{ backgroundColor: 'Background' }} border="1px solid black">
            <SelectType type={type} setType={handleType} />
            <Grid container p={2}>
              <SearchOption
                openOption={openOption}
                setOpenOption={setOpenOption}
                setDetailOption={handleOption}
              />
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                >
                  <SelectSort sort={sort} setSort={handleSort} />
                </Stack>
              </Grid>
            </Grid>
            {isLoading && page == 1 ? (
              <Typography>로딩중...</Typography>
            ) : error || !initData ? (
              <Typography>에러 발생</Typography>
            ) : content?.length == 0 ? (
              <Typography>데이터가 없습니다</Typography>
            ) : (
              <>
                <Stack alignItems={'center'}>
                  <Stack gap={2}>
                    {content?.map((project: IPost, index: number) => (
                      <Box key={index}>
                        <MainCard {...project} type={type} />
                      </Box>
                    ))}
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    position: 'fixed',
                    right: 20,
                    bottom: 80,
                  }}
                >
                  <EditButton />
                </Box>
                {spinner && <CircularProgress />}
                <Box
                  sx={{
                    bottom: 0,
                    height: '1vh',
                    backgroundColor: 'primary.main',
                  }}
                  ref={target}
                />
              </>
            )}
          </Box>
        </Container>
      </div>
      {/* pc view */}
      <div className="pc-layout">
        <Container sx={{ backgroundColor: 'white', border: '1px solid black' }}>
          <Stack direction={'row'} border="1px solid black">
            <Stack flex={1}>
              <Box height={'200px'} border="1px solid black">
                피어 소개 배너
              </Box>
              <SelectType type={type} setType={handleType} pc />
              <Grid container p={2}>
                <SearchOption
                  openOption={openOption}
                  setOpenOption={setOpenOption}
                  setDetailOption={handleOption}
                />
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Typography>모집글</Typography>
                    <SelectSort sort={sort} setSort={handleSort} />
                  </Stack>
                </Grid>
              </Grid>
              {isLoading && page == 1 ? (
                <Typography>로딩중...</Typography>
              ) : error ? (
                <Typography>에러 발생</Typography>
              ) : content?.length == 0 ? (
                <Typography>데이터가 없습니다</Typography>
              ) : (
                <>
                  <Grid container spacing={2}>
                    {content?.map((project: IPost, index: number) => (
                      <Grid item key={index} sm={12} md={6} lg={4}>
                        <MainCard {...project} type={type} />
                      </Grid>
                    ))}
                  </Grid>
                  {spinner && <CircularProgress />}
                  <Box
                    sx={{
                      bottom: 0,
                      height: '1vh',
                      backgroundColor: 'primary.main',
                    }}
                    ref={target}
                  />
                </>
              )}
            </Stack>
            <Stack width={'250px'} height={'100%'}>
              <MainProfile />
              <MainShowcase />
              <MainCarousel />
            </Stack>
          </Stack>
        </Container>
      </div>
      <PwaInstallBanner />
    </>
  )
}

export default MainPage
