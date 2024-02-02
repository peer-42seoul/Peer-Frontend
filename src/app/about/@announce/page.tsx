'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import { IPagination } from '@/types/IPagination'
import {
  Card,
  CardActionArea,
  CardActions,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import useSWR from 'swr'

//TODO: 페이지네이션

interface AnnounceCardProps {
  id: number
  title: string
  writer: string
  date: string
}

const AnnounceCard = ({ title, writer, date, id }: AnnounceCardProps) => {
  const router = useRouter()
  return (
    <CardActions
      sx={{
        boxShadow: 'none',
        backgroundColor: 'background.secondary',
        padding: '0.5rem',
      }}
    >
      <CardActionArea
        onClick={() => router.push(`/about/detail/${id}`)}
        sx={{
          '.MuiCardActionArea-focusHighlight': {
            background: 'transparent',
          },
        }}
      >
        <Typography>{title}</Typography>
        <Stack spacing={'0.5rem'} direction={'row'}>
          <Typography variant="caption">{writer}</Typography>
          <Typography variant="caption">{date}</Typography>
        </Stack>
      </CardActionArea>
    </CardActions>
  )
}

const AnnouncePage = () => {
  const [page, setPage] = useState<number>(1)
  const { data, isLoading, error } = useSWR<IPagination<AnnounceCardProps[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/about/announcement?page=${page}&size=5`,
    defaultGetFetcher,
  )

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  if (isLoading) return <div>로딩중</div>

  if (error) return <div>에러 발생</div>

  return (
    <Card sx={{ padding: '2rem', backgroundColor: 'background.secondary' }}>
      <Stack>
        <Typography variant="Title2">공지사항</Typography>
      </Stack>
      <br />
      <Stack>
        <Stack minHeight={'30rem'}>
          <Stack spacing={'1rem'}>
            {data &&
              data?.content.map((data, index) => (
                <AnnounceCard
                  key={data.title + index}
                  id={data.id}
                  title={data.title}
                  writer={data.writer}
                  date={data.date}
                />
              ))}
          </Stack>
        </Stack>
        <Pagination
          color="primary"
          count={data?.totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
    </Card>
  )
}

export default AnnouncePage
