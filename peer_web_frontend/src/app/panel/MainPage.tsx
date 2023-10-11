'use client'
import { Container, Box, Grid, Stack, Typography, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { ProjectType, ProjectSort } from '../page'
import EditButton from './EditButton'
import MainCard from './MainCard'
import SearchOption from './SearchOption'
import SelectSort from './SelectSort'
import SelectType from './SelectType'
import { defaultGetFetcher } from '@/api/fetchers'
import useSWR from 'swr'
import useMedia from '@/hook/useMedia'
import MainProfile from './MainProfile'
import MainShowcase from './MainShowcase'
import MainCarousel from './MainCarousel'
import { useSearchParams } from 'next/navigation'
import useInfiniteScroll from '@/hook/useInfiniteScroll'

const MainPage = ({ initData }: { initData: any }) => {
  const { isPc } = useMedia()
  const [page, setPage] = useState<number>(1)
  const [type, setType] = useState<ProjectType>('projects')
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [sort, setSort] = useState<ProjectSort>('recent')
  /* 추후 디자인 추가되면 schedule 추가하기 */
  const [detailOption, setDetailOption] = useState<{
    due: string
    region: string
    place: string
    status: string
    tag: string
  }>({ due: '', region: '', place: '', status: '', tag: '' })
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  // json server용 url
  // useswr의 초기값을 initdata로 설정하려했으나 실패. 지금 코드는 초기에 서버와 클라이언트 둘다 리퀘스트를 보내게 됨
  const { data: tmpData, isLoading, mutate } = useSWR(
    `https://27366dd1-6e95-4ec6-90c2-062a85a79dfe.mock.pstmn.io/${type}-sort-${sort}`,
    defaultGetFetcher,
    { fallbackData: initData },
  )
  console.log("tmpData", tmpData, initData);

  const pagesize = 10
  //실제 api 서버용 url. mockup 데이터 만들기 어려워서 보류중
  //모바일인지 pc인지에 따라서도 pagesize가 달라져야
  const url = `http://localhost:3001?type=${type}&sort=${sort}&page=${page}&pagesize=${pagesize}&keyword=${keyword}&due=${detailOption.due}&region=${detailOption.place}&place=${detailOption.place}&status=${detailOption.status}&tag=${detailOption.tag}`
  console.log('url', url)

  /* 더미데이터 추가. api의 response가 바뀌면서 바뀜 */
  const data: IPost[] = [
    {
      post_id: 1,
      title: "더미 포스트 1",
      image: "https://picsum.photos/200/300",
      user_id: 123,
      user_nickname: "dummy_user1",
      user_thumbnail: "https://picsum.photos/100/100",
      status: "published",
      tagList: ["dummy", "typescript", "example"],
      isFavorite: true
    },
    {
      post_id: 2,
      title: "더미 포스트 2",
      image: "https://picsum.photos/200/300",
      user_id: 456,
      user_nickname: "dummy_user2",
      user_thumbnail: "https://picsum.photos/100/100",
      status: "draft",
      tagList: ["dummy", "javascript", "example"],
      isFavorite: false
    },
    {
      post_id: 3,
      title: "더미 포스트 3",
      image: "https://picsum.photos/200/300",
      user_id: 789,
      user_nickname: "dummy_user3",
      user_thumbnail: "https://picsum.photos/100/100",
      status: "published",
      tagList: ["dummy", "react", "example"],
      isFavorite: true
    },
    {
      post_id: 4,
      title: "더미 포스트 4",
      image: "https://picsum.photos/200/300",
      user_id: 101,
      user_nickname: "dummy_user4",
      user_thumbnail: "https://picsum.photos/100/100",
      status: "draft",
      tagList: ["dummy", "java", "example"],
      isFavorite: false
    },
    {
      post_id: 5,
      title: "더미 포스트 5",
      image: "https://picsum.photos/200/300",
      user_id: 202,
      user_nickname: "dummy_user5",
      user_thumbnail: "https://picsum.photos/100/100",
      status: "published",
      tagList: ["dummy", "python", "example"],
      isFavorite: true
    }
  ];

  /* 무한 스크롤 */
  const pageLimit = 2;
  /* 임시 변수 */
  const { target, spinner } = useInfiniteScroll({ setPage, mutate, pageLimit, page });

  if (isLoading) return <Typography>로딩중...</Typography>

  if (!data) return <Typography>데이터가 없습니다</Typography>

  /* pc 화면 */
  if (isPc) {
    return (
      <Container sx={{ backgroundColor: 'beige' }}>
        <Stack bgcolor={'orange'} direction={'row'}>
          <Stack flex={1}>
            <Box bgcolor={'gray'} height={'200px'}>
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
            <Grid container spacing={2}>
              {data.map((project: IPost) => (
                <Grid item xs={12} key={project.user_id} sm={6} md={4}>
                  <MainCard {...project} />
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
          </Stack>
          <Stack width={'250px'} height={'100%'} bgcolor={'yellow'}>
            <MainProfile />
            <MainShowcase />
            <MainCarousel />
          </Stack>
        </Stack>
      </Container>
    )
  }

  /* mobile 화면 */
  return (
    <Container sx={{ backgroundColor: 'gray' }}>
      <Box sx={{ backgroundColor: 'white' }}>
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
        <Stack alignItems={'center'} gap={2}>
          {data.map((project: IPost) => (
            <Box key={project.user_id}>
              <MainCard {...project} />
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
    </Container>
  )
}

export default MainPage
