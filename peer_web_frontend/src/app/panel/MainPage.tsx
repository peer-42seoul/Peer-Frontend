'use client'

import { IProject } from '@/types/IProejct'
import { Container, Box, Grid, Stack } from '@mui/material'
import { useState } from 'react'
import { ProjectType, ProjectSort } from '../page'
import EditButton from './EditButton'
import MainCard from './MainCard'
import SearchOption from './SearchOption'
import SelectSort from './SelectSort'
import SelectType from './SelectType'
import { get } from 'http'
import { defaultGetFetcher } from '@/api/fetchers'
import useSWR from 'swr'

const MainPage = ({ initData }: { initData: any }) => {
  const [type, setType] = useState<ProjectType>('studies')
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [sort, setSort] = useState<ProjectSort>('recent')
  // json server용 url
  const { data } = useSWR(`http://localhost:3001/${type}-sort-${sort}`, defaultGetFetcher, { fallbackData: initData });
  console.log("data", data);

  //추후에 지울 예정
  console.log('type', type)
  return (
    <Container sx={{ backgroundColor: 'gray' }}>
      <Box sx={{ backgroundColor: 'white' }}>
        <SelectType setType={setType} />
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
