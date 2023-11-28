'use client'

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import { ShowcasePageProps } from '../page'

const ShowcaseCard = ({ data }: { data: ShowcasePageProps }) => {
  const [isTouched, setIsTouched] = useState(false)

  const handleCardClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsTouched(!isTouched)
  }

  return (
    <Stack height={'70vh'}>
      <Avatar
        src={data.image}
        sx={{ width: '100%', height: '100%' }}
        variant="rounded"
      />
      <Card
        sx={{
          width: '100%',
          height: isTouched ? '100%' : '30%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}
      >
        <CardActions onClick={handleCardClick}>
          <CardContent>
            <Stack direction={'row'}>
              <Typography>팀 이미지</Typography>
              <Typography>팀 이름: {data.name}</Typography>
              <Typography>좋아요</Typography>
              <Typography>관심 추가</Typography>
            </Stack>
            <Typography>글 내용: {data.description}</Typography>
            <Stack>
              <Stack direction={'row'}>
                <Typography>시작일</Typography>
                <Typography>종료일</Typography>
              </Stack>
              <Typography>기술 스택</Typography>
            </Stack>
          </CardContent>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default ShowcaseCard
