'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import useMedia from '@/hook/useMedia'
import { Avatar, Card, Stack, Typography } from '@mui/material'
import Image from 'next/image'
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
  const { isPc } = useMedia()
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
            <Stack direction={'row'} spacing={'0.5rem'}>
              <Typography variant="Caption">이메일</Typography>
              <Typography variant="Caption">이메일</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Image
            src={data.image ? data.image : '/images/banners/default-pc.svg'}
            alt="이미지"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 768px"
            style={{ width: isPc ? '50%' : '100%', height: 'auto' }}
          />
          <br />
          <Typography variant="Body1">{data.content}</Typography>
        </Stack>
      </Stack>
    </Card>
  )
}

export default DetailPage
