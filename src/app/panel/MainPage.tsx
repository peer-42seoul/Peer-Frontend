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

export type ProjectSort = 'latest' | 'hit'
export type ProjectType = 'STUDY' | 'PROJECT'

const MainPage = ({ initData }: { initData: IPagination<IPost[]> }) => {
  const [content, setContent] = useState<IPost[]>(initData?.content)
  const [page, setPage] = useState<number>(1)
  const [type, setType] = useState<ProjectType>('STUDY')
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [sort, setSort] = useState<ProjectSort>('latest')
  /* 추후 디자인 추가되면 schedule 추가하기 */
  const [detailOption, setDetailOption] = useState<{
    due: string
    region1: string
    region2: string
    place: string
    status: string
    tag: string
  }>({ due: '', region1: '', region2: '', place: '', status: '', tag: '' })
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword') ?? ''
  const { isLogin } = useAuthStore()
  const axiosInstance: AxiosInstance = useAxiosWithAuth()

  const pageSize = 3
  /* page가 1이면 서버가 가져온 데이터(initData)로 렌더링 */
  const {
    data: newData,
    isValidating,
    error,
    mutate,
  } = useSWR<IPagination<IPost[]>>(
    page !== 1
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=${type}&sort=${sort}&page=${page}&pageSize=${pageSize}&keyword=${keyword}&due=${detailOption.due}&region1=${detailOption.region1}&region2=${detailOption.region2}&place=${detailOption.place}&status=${detailOption.status}&tag=${detailOption.tag}`
      : null,
    isLogin
      ? (url: string) => axiosInstance.get(url).then((res) => res.data)
      : defaultGetFetcher,
  )

  useEffect(() => {
    if (!newData) return
    if (newData && newData?.last)
      setContent([...content, ...(newData?.content ?? [])])
  }, [content, newData])

  const { target, spinner } = useInfiniteScrollHook(
    setPage,
    mutate,
    (initData?.last || newData?.last) ?? false,
    page,
  )

  return (
    <>
      {/* mobile view */}
      <Container className="mobile-layout">
        <Box sx={{ backgroundColor: 'white' }} border="1px solid black">
          <SelectType type={type} setType={setType} />
          <Grid container p={2}>
            <SearchOption
              openOption={openOption}
              setOpenOption={setOpenOption}
              setDetailOption={setDetailOption}
            />
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems={'center'}
                justifyContent={'flex-end'}
              >
                <SelectSort sort={sort} setSort={setSort} />
              </Stack>
            </Grid>
          </Grid>
          {isValidating ? (
            <Typography>로딩중...</Typography>
          ) : error ? (
            <Typography>에러 발생</Typography>
          ) : content?.length == 0 ? (
            <Typography>데이터가 없습니다</Typography>
          ) : (
            <>
              <Stack alignItems={'center'} gap={2}>
                {content?.map((project: IPost) => (
                  <Box key={project.user_id}>
                    <MainCard {...project} type={type} />
                  </Box>
                ))}
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
      {/* pc view */}
      <Container
        sx={{ backgroundColor: 'white', border: '1px solid black' }}
        className="pc-layout"
      >
        <Stack direction={'row'} border="1px solid black">
          <Stack flex={1}>
            <Box height={'200px'} border="1px solid black">
              피어 소개 배너
            </Box>
            <SelectType type={type} setType={setType} pc />
            <Grid container p={2}>
              <SearchOption
                openOption={openOption}
                setOpenOption={setOpenOption}
                setDetailOption={setDetailOption}
              />
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Typography>모집글</Typography>
                  <SelectSort sort={sort} setSort={setSort} />
                </Stack>
              </Grid>
            </Grid>
            {isValidating ? (
              <Typography>로딩중...</Typography>
            ) : error ? (
              <Typography>에러 발생</Typography>
            ) : content?.length == 0 ? (
              <Typography>데이터가 없습니다</Typography>
            ) : (
              <>
                <Grid container spacing={2}>
                  {content?.map((project: IPost) => (
                    <Grid item key={project.user_id} sm={12} md={4}>
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
    </>
  )
}

export default MainPage
