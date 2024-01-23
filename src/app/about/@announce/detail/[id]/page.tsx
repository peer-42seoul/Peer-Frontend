'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import { Avatar, Card, Stack, Typography } from '@mui/material'
import useSWR from 'swr'

interface AnnounceDailProp {
  title: string
  writer: string
  createdAt: Date
  updatedAt: Date | null
  content: string
  image: string | null
  view: number
}

const DetailPage = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, error } = useSWR<AnnounceDailProp>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/about/announcement/${params.id}`,
    defaultGetFetcher,
  )

  if (isLoading) return <Typography>로딩중</Typography>

  if (error || !data) return <Typography>에러 발생</Typography>

  return (
    <Card sx={{ padding: '2rem' }}>
      <Stack minHeight={'30rem'} spacing={'2rem'}>
        <Stack>
          <Typography variant="Title2">{data.title}</Typography>

          <Stack direction={'row'} spacing={'0.5rem'}>
            <Typography variant="Caption">생성일자</Typography>
            <Typography variant="Caption">
              {data.createdAt.toISOString()}
            </Typography>
          </Stack>
          {data.updatedAt && (
            <Stack direction={'row'} spacing={'0.5rem'}>
              <Typography variant="Caption">수정일자</Typography>
              <Typography variant="Caption">
                {data.createdAt.toISOString()}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Stack direction={'row'} spacing={'1rem'}>
          <Avatar />
          <Stack>
            <Stack direction={'row'} spacing={'0.5rem'}>
              <Typography variant="Caption">작성자</Typography>
              <Typography variant="Caption">{data.writer}</Typography>
            </Stack>
            <Stack direction={'row'} spacing={'0.5rem'}>
              <Typography variant="Caption">조회수</Typography>

              <Typography variant="Caption">{data.view}</Typography>
            </Stack>
            <Stack direction={'row'} spacing={'0.5rem'}>
              <Typography variant="Caption">이메일</Typography>
              <Typography variant="Caption">이메일</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="Body1">{data.content}</Typography>
        </Stack>
      </Stack>
    </Card>
  )
}

export default DetailPage
