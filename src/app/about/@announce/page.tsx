'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import CuCircularProgress from '@/components/CuCircularProgress'
import NoDataDolphin from '@/components/NoDataDolphin'
import useMedia from '@/hook/useMedia'
import useAboutLayout from '@/states/useAboutLayout'
import { IPagination } from '@/types/IPagination'
import {
  Card,
  CardActionArea,
  CardActions,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import useSWR from 'swr'

//TODO: 페이지네이션

interface AnnounceCardProps {
  id: number
  title: string
  writer: string
  date: string
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '없음'
  const dateObj = new Date(dateStr)
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1 // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const date = dateObj.getDate()
  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()

  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${
    date < 10 ? '0' + date : date
  } ${hours}시 ${minutes}분`

  return formattedDate
}

const AnnounceCard = ({ title, writer, date, id }: AnnounceCardProps) => {
  const { setAnnounceDetail } = useAboutLayout()
  return (
    <CardActions
      sx={{
        boxShadow: 'none',
        backgroundColor: 'background.secondary',
        padding: '0.5rem',
        borderRadius: '0.5rem',
      }}
    >
      <CardActionArea
        onClick={() => setAnnounceDetail(id)}
        sx={{
          '.MuiCardActionArea-focusHighlight': {
            background: 'transparent',
          },
        }}
      >
        <Typography>{title}</Typography>
        <Stack spacing={'0.5rem'} direction={'row'}>
          <Typography variant="caption">{writer}</Typography>
          <Typography variant="caption">{formatDate(date)}</Typography>
        </Stack>
      </CardActionArea>
    </CardActions>
  )
}

const AnnouncePage = () => {
  const { isPc } = useMedia()
  const [page, setPage] = useState<number>(1)
  const { data, isLoading, error } = useSWR<IPagination<AnnounceCardProps[]>>(
    `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/about/announcement?page=${page}&size=5`,
    defaultGetFetcher,
  )

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  if (isLoading) return <CuCircularProgress color="primary" />

  if (error) return <NoDataDolphin message="문제가 있나봐요 ㅠㅠ" />

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
        <Stack alignItems={!isPc ? 'center' : ''}>
          <Pagination
            color="primary"
            count={data?.totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </Stack>
    </Card>
  )
}

export default AnnouncePage
