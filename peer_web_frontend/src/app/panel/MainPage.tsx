'use client'

import { IProject } from '@/types/IProejct'
import { Container, Box, Grid, Stack, Typography } from '@mui/material'
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

const MainPage = ({ initData }: { initData: any }) => {
  const { isPc } = useMedia()
  const [page] = useState<number>(1)
  const [type, setType] = useState<ProjectType>('projects')
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [sort, setSort] = useState<ProjectSort>('recent')
  //세부옵션용 state
  const [detailOption, setDetailOption] = useState<{
    due: string
    region: string
    place: string
    status: string
    tag: string
  }>({ due: '', region: '', place: '', status: '', tag: '' })

  // json server용 url
  // useswr의 초기값을 initdata로 설정하려했으나 실패...
  // 지금 코드는 초기에 서버와 클라이언트 둘다 리퀘스트를 보내게 됨
  const { data, isLoading } = useSWR(
    `https://27366dd1-6e95-4ec6-90c2-062a85a79dfe.mock.pstmn.io/${type}-sort-${sort}`,
    defaultGetFetcher,
    { fallbackData: initData },
  )

  const pagesize = 10
  //실제 api 서버용 url. mockup 데이터 만들기 어려워서 보류중
  const url = `http://localhost:3001?type=${type}&sort=${sort}&page=${page}&pagesize=${pagesize}&due=${detailOption.due}&region=${detailOption.place}&place=${detailOption.place}&status=${detailOption.status}&tag=${detailOption.tag}`
  console.log('url', url)
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
              {data.map((project: IProject) => (
                <Grid item xs={12} key={project.id} sm={6} md={4}>
                  <MainCard {...project} />
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Stack width={'250px'} height={'100%'} bgcolor={'green'}>
            <Typography>쇼케이스</Typography>
            <Box bgcolor={'blue'} height={'400px'}>
              쇼케이스
            </Box>
            <Box height={'100px'} bgcolor={'yellow'}>
              캐러셀
            </Box>
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
          {data.map((project: IProject) => (
            <Box key={project.id}>
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
    </Container>
  )
}

export default MainPage
