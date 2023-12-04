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
import useMedia from '@/hook/useMedia'
import { ICardData } from './types'

const ShowcaseCard = ({ data }: { data: ICardData | undefined }) => {
  const { isPc } = useMedia()
  const [isTouched, setIsTouched] = useState(false)

  const handleCardClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsTouched(!isTouched)
  }

  if (isPc) {
    return (
      <Stack direction={'row'} spacing={10}>
        <Card
          sx={{
            height: isTouched ? '80%' : '30%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            width: '100%',
          }}
        >
          {data !== undefined ? (
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
          ) : (
            <Typography>데이터가 없습니다.</Typography>
          )}
        </Card>
      </Stack>
    )
  }

  return (
    <Stack height={'70vh'} width={'100%'} alignItems={'center'}>
      {!data ? (
        <Typography>데이터가 없습니다.</Typography>
      ) : (
        <>
          <Avatar
            src={data.image}
            sx={{ width: '100%', height: '100%', mt: 10 }}
            variant="rounded"
          />
          <Card
            sx={{
              height: isTouched ? '80%' : '40%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              width: '100%',
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
        </>
      )}
    </Stack>
  )
}

export default ShowcaseCard
