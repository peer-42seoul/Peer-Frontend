'use client'

import { Container, Grid, Stack, Typography } from '@mui/material'
import { containerStyle } from '@/app/panel/main-page/Mainpage.style'

import NoDataDolphin from '@/components/NoDataDolphin'

import { IPagination } from '@/types/IPagination'
import { IJob } from '@/types/IJob'
import JobCard from '@/app/job/JobCard'

const data: IPagination<IJob[]> = {
  content: [
    {
      title: '6월의 인기 채용 공고',
      writerName: 'jujeon',
      createdAt: '2023-05-15',
      id: 1,
    },
    {
      title: '5월의 인기 채용 공고',
      writerName: 'jujeon',
      createdAt: '2023-06-01',
      id: 2,
    },
    {
      title: '4월의 인기 채용 공고',
      writerName: 'jujeon',
      createdAt: '2023-04-20',
      id: 3,
    },
    // Add more IJob objects as needed
  ],
  pageable: {
    sort: {
      empty: false,
      unsorted: false,
      sorted: true,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 10,
    paged: true,
    unpaged: false,
  },
  totalPages: 1,
  totalElements: 3,
  last: true,
  size: 10,
  number: 0,
  sort: {
    empty: false,
    unsorted: false,
    sorted: true,
  },
  numberOfElements: 3,
  first: true,
  empty: false,
}

const JobInfo = () => {
  // const { data, isLoading, error } = useSWR<IPagination<IJob[]>>(
  //   `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/job?page=1&pageSize=10`,
  //   defaultGetFetcher,
  // )
  // const noContent = !isLoading
  //   ? error
  //     ? '에러 발생'
  //     : data?.content?.length == 0
  //       ? '데이터가 없습니다'
  //       : null
  //   : null

  return (
    <Container sx={containerStyle}>
      <Stack mt={'1rem'} mb={'0.5rem'} spacing={4}>
        <Typography variant={'Title1'} color={'text.strong'}>
          채용 공고
        </Typography>
      </Stack>
      <Stack direction={'row'} spacing={4}>
        {data?.content.length === 0 ? (
          <Stack
            width={'100%'}
            height={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <NoDataDolphin
              message={'데이터가 없습니다.'}
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
      </Stack>
    </Container>
  )
}

export default JobInfo
