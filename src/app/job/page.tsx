'use client'

import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { containerStyle } from '@/app/panel/main-page/Mainpage.style'

import NoDataDolphin from '@/components/NoDataDolphin'

import { IPagination } from '@/types/IPagination'
import { IJob } from '@/types/IJob'
import JobCard from '@/app/job/JobCard'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
import { Suspense } from 'react'

const JobInfo = () => {
  const { data, isLoading, error } = useSWR<IPagination<IJob[]>>(
    `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/job?page=1&pageSize=10`,
    defaultGetFetcher,
  )
  const noContent = !isLoading
    ? error
      ? '에러 발생'
      : data?.content?.length == 0
        ? '데이터가 없습니다'
        : null
    : null

  return (
    <Container sx={containerStyle}>
      <Stack mb={'0.5rem'} spacing={4}>
        <Typography color={'text.strong'} variant={'Title1'}>
          채용 공고
        </Typography>
      </Stack>
      <Stack direction={'row'} spacing={4}>
        <Suspense fallback={<CircularProgress />}>
          {noContent ? (
            <Stack
              width={'100%'}
              height={'100%'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <NoDataDolphin
                message={noContent}
                backgroundColor={'background.primary'}
              />
            </Stack>
          ) : (
            <Grid container spacing={'1rem'}>
              {data?.content?.map((job: IJob) => (
                <Grid item key={job.id} sm={12} md={6} lg={4}>
                  <JobCard {...job} />
                </Grid>
              ))}
            </Grid>
          )}
        </Suspense>
      </Stack>
    </Container>
  )
}

export default JobInfo
