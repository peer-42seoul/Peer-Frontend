'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import CuCircularProgress from '@/components/CuCircularProgress'
import DynamicToastViewer from '@/components/DynamicToastViewer'
import { Avatar, Button, Card, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

interface AnnounceDailProp {
  title: string
  writer: string
  createdAt: string
  updatedAt: string | null
  content: string
  image: string | null
  view: number
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

const DetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { data, isLoading, error } = useSWR<AnnounceDailProp>(
    `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/about/announcement/${params.id}`,
    defaultGetFetcher,
  )

  if (isLoading) return <CuCircularProgress color="primary" />

  if (error || !data) return <Typography>에러 발생</Typography>

  return (
    <Card sx={{ padding: '2rem' }}>
      <Stack>
        <Button
          sx={{ width: 'fit-content' }}
          onClick={() => router.push('/about/announce')}
        >
          목록으로
        </Button>
      </Stack>
      <Stack minHeight={'30rem'} spacing={'2rem'}>
        <Stack>
          <Typography variant="Title2">{data.title}</Typography>

          <Stack direction={'row'} spacing={'0.5rem'}>
            <Typography variant="Caption">생성일자</Typography>
            <Typography variant="Caption">
              {formatDate(data.createdAt)}
            </Typography>
          </Stack>
          {data.updatedAt && (
            <Stack direction={'row'} spacing={'0.5rem'}>
              <Typography variant="Caption">수정일자</Typography>
              <Typography variant="Caption">
                {formatDate(data.updatedAt)}
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
          </Stack>
        </Stack>
        <Stack>
          <DynamicToastViewer initialValue={data.content} />
        </Stack>
      </Stack>
    </Card>
  )
}

export default DetailPage
