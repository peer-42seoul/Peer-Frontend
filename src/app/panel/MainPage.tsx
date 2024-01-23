'use client'

import {
  Container,
  Box,
  Grid,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import FloatEditButton from './main-page/FloatEditButton'
import MainCard from './main-page/MainCard'
import SearchOption from './main-page/SearchOption'
import SelectSort from './main-page/SelectSort'
import SelectType from './main-page/SelectType'
import { defaultGetFetcher } from '@/api/fetchers'
import useSWR from 'swr'
import MainProfile from './main-page/MainProfile'
import MainShowcase from './main-page/MainShowcase'
import MainCarousel from './main-page/MainCarousel'
import { useSearchParams } from 'next/navigation'
import { useInfiniteScrollHook } from '@/hook/useInfiniteScroll'
import { IPost, ProjectType } from '@/types/IPostDetail'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'
import { AxiosInstance } from 'axios'
import { IPagination } from '@/types/IPagination'
import PwaInstallBanner from './PwaInstallBanner'
import PushAlertBanner from './PushAlertBanner'
import MainBanner from '@/app/panel/main-page/MainBanner'
import io from 'socket.io-client'
import { getCookie } from 'cookies-next'
import useSocket from '@/states/useSocket'

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export type ProjectSort = 'latest' | 'hit'
export interface IDetailOption {
  isInit?: boolean
  due1: number
  due2: number
  region1: string
  region2: string
  place: string
  status: string
  tag: string
}

export const socket = io(`${process.env.NEXT_PUBLIC_API_URL}:8084`, {
  transports: ['socket.io', 'polling'],
  query: {
    token: getCookie('accessToken') ? getCookie('accessToken') : '',
  },
})

const MainPage = ({ initData }: { initData: IPagination<IPost[]> }) => {
  const [content, setContent] = useState<IPost[]>(initData?.content)
  const [page, setPage] = useState<number>(1)
  const [type, setType] = useState<ProjectType | undefined>(undefined) //'STUDY'
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [sort, setSort] = useState<ProjectSort | undefined>(undefined) //'latest'
  const { setSocket } = useSocket()
  /* 추후 디자인 추가되면 schedule 추가하기 */
  const [detailOption, setDetailOption] = useState<IDetailOption>({
    isInit: true,
    due1: 0,
    due2: 100,
    region1: '',
    region2: '',
    place: '',
    status: '',
    tag: '',
  })
  const dueObject: { [key: number]: string } = {
    0: '1주일',
    20: '1개월',
    40: '3개월',
    60: '6개월',
    80: '9개월',
    100: '12개월 이상',
  }
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
          dueObject[detailOption.due1]
        }&due=${dueObject[detailOption.due2]}&region1=${
          detailOption.region1
        }&region2=${detailOption.region2}&place=${detailOption.place}&status=${
          detailOption.status
        }&tag=${detailOption.tag}`,
    isLogin
      ? (url: string) => axiosInstance.get(url).then((res) => res.data)
      : defaultGetFetcher,
  )

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected')
    })
    socket.on('disconnect', () => {
      console.log('socket disconnected')
    })
    socket.on('connect_error', (err) => {
      console.log(err)
    })
    socket.on('reconnect', (attemptNumber) => {
      console.log('reconnect', attemptNumber)
    })
    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('reconnect_attempt', attemptNumber)
    })
    setSocket(socket)
  }, [])

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

  const handleType = useCallback((value: ProjectType) => {
    setType(value)
    //type이 변경될 경우 초기화
    setPage(1)
    setDetailOption({
      due1: 0,
      due2: 100,
      region1: '',
      region2: '',
      place: '',
      status: '',
      tag: '',
    })
    setSort('latest')
  }, [])

  const handleSort = useCallback((value: ProjectSort) => {
    setSort(value)
    setPage(1)
  }, [])

  const handleOption = useCallback((value: IDetailOption) => {
    setDetailOption(value)
    setPage(1)
  }, [])

  return (
    <>
      <PushAlertBanner />
      {/* mobile view */}
      <div className="mobile-layout">
        <Container
          sx={{
            backgroundColor: 'Background.primary',
            border: '1px solid black',
            maxWidth: '56.75rem',
          }}
        >
          <MainBanner />
          <SelectType type={type} setType={handleType} />
          <Grid container>
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
          {/*card list 영역*/}
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
              {/* 무한 스크롤 */}
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
          <Box
            sx={{
              position: 'fixed',
              right: 20,
              bottom: 80,
            }}
          >
            <FloatEditButton />
          </Box>
          {spinner && <CircularProgress />}
        </Container>
      </div>
      {/* pc view */}
      <div className="pc-layout">
        <Container
          sx={{
            backgroundColor: 'Background.primary',
            border: '1px solid black',
          }}
        >
          <Stack direction={'row'} border="1px solid black" spacing={4}>
            <Stack flex={1} gap={'0.5rem'}>
              <MainBanner />
              <SelectType type={type} setType={handleType} />
              <Grid container bgcolor={'Background.primary'}>
                <SearchOption
                  openOption={openOption}
                  setOpenOption={setOpenOption}
                  setDetailOption={handleOption}
                />
              </Grid>
              <Stack
                direction="row"
                alignItems={'center'}
                justifyContent={'flex-end'}
              >
                <SelectSort sort={sort} setSort={handleSort} />
              </Stack>
              {/*card list 영역*/}
              {isLoading && page == 1 ? (
                <Typography>로딩중...</Typography>
              ) : error ? (
                <Typography>에러 발생</Typography>
              ) : content?.length == 0 ? (
                <Typography>데이터가 없습니다</Typography>
              ) : (
                <>
                  <Grid container spacing={'1rem'}>
                    {content?.map((project: IPost, index: number) => (
                      <Grid item key={index} sm={12} md={6} lg={4}>
                        <MainCard {...project} type={type} />
                      </Grid>
                    ))}
                  </Grid>
                  {/* 무한 스크롤 */}
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
            <Stack maxWidth={'19.25rem'} height={'100%'} gap={'1rem'}>
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
