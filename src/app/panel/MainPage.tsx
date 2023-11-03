'use client'
import {
  Container,
  Box,
  Grid,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useState } from 'react'
import EditButton from './EditButton'
import MainCard from './MainCard'
import SearchOption from './SearchOption'
import SelectSort from './SelectSort'
import SelectType from './SelectType'
import { defaultGetFetcher, getFetcherWithInstance } from '@/api/fetchers'
import useSWR from 'swr'
import MainProfile from './MainProfile'
import MainShowcase from './MainShowcase'
import MainCarousel from './MainCarousel'
import { useSearchParams } from 'next/navigation'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
import { IPost } from '@/types/IPostDetail'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'
import { AxiosInstance } from 'axios'
//latest, hit
export type ProjectSort = 'latest' | 'hit'
export type ProjectType = 'Study' | 'Project'

const MainPage = ({ initData }: { initData: IPost[] }) => {
  const [page, setPage] = useState<number>(1)
  const [type, setType] = useState<ProjectType>('Study')
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [sort, setSort] = useState<ProjectSort>('latest')
  /* 추후 디자인 추가되면 schedule 추가하기 */
  const [detailOption, setDetailOption] = useState<{
    due: string
    region: string
    place: string
    status: string
    tag: string
  }>({ due: '', region: '', place: '', status: '', tag: '' })
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword') ?? ''
  const { isLogin } = useAuthStore()
  const axiosInstance: AxiosInstance = useAxiosWithAuth()

  // useswr의 초기값을 initdata로 설정하려했으나 실패. 지금 코드는 초기에 서버와 클라이언트 둘다 리퀘스트를 보내게 됨
  const pageSize = 10
  const swrKey = isLogin
    ? [
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=${type}&sort=${sort}&page=${page}&pageSize=${pageSize}&keyword=${keyword}&due=${detailOption.due}&region=${detailOption.place}&place=${detailOption.place}&status=${detailOption.status}&tag=${detailOption.tag}`,
      axiosInstance,
    ]
    : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=${type}&sort=${sort}&page=${page}&pageSize=${pageSize}&keyword=${keyword}&due=${detailOption.due}&region=${detailOption.place}&place=${detailOption.place}&status=${detailOption.status}&tag=${detailOption.tag}`

  const fetcher = isLogin
    ? (url: string) =>
      getFetcherWithInstance(url, axiosInstance)
    : defaultGetFetcher

  const { data, isLoading, error, mutate } = useSWR(swrKey, fetcher, {
    fallbackData: initData,
  })
  const pageLimit = data?.totalPages
  const { target, spinner } = useInfiniteScroll({
    setPage,
    mutate,
    pageLimit,
    page,
  })

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
          {isLoading ? (
            <Typography>로딩중...</Typography>
          ) : error ? (
            <Typography>에러 발생</Typography>
          ) : data?.content.length == 0 ? (
            <Typography>데이터가 없습니다</Typography>
          ) : (
            <>
              <Stack alignItems={'center'} gap={2}>
                {data?.content.map((project: IPost) => (
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
            {isLoading ? (
              <Typography>로딩중...</Typography>
            ) : error ? (
              <Typography>에러 발생</Typography>
            ) : data?.content.length == 0 ? (
              <Typography>데이터가 없습니다</Typography>
            ) : (
              <>
                <Grid container spacing={2}>
                  {data?.content.map((project: IPost) => (
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
