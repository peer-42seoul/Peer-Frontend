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

const MainPage = ({ initData }: { initData: any }) => {
  const [type, setType] = useState<ProjectType>('projects')
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [sort, setSort] = useState<ProjectSort>('recent')
  //세부옵션용 state
  // const [detailOp, setDetailOp] = useState < {
  //   due: '',
  //   region: '',
  //   place: '',
  //   status: '',
  //   tag=''
  // } > (false)

  // json server용 url
  // useswr의 초기값을 initdata로 설정하려했으나 실패...
  // 지금 코드는 초기에 서버와 클라이언트 둘다 리퀘스트를 보내게 됨
  const { data, isLoading } = useSWR(`http://localhost:3001/${type}-sort-${sort}`, defaultGetFetcher, { fallbackData: initData });

  if (isLoading)
    return (<Typography>로딩중...</Typography>)

  if (!data)
    return (<Typography>데이터가 없습니다</Typography>)

  return (
    <Container sx={{ backgroundColor: 'gray' }}>
      <Box sx={{ backgroundColor: 'white' }}>
        <SelectType type={type} setType={setType} />
        <Grid container p={2}>
          <SearchOption openOption={openOption} setOpenOption={setOpenOption} />
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
          {data?.map((project: IProject) => (
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
