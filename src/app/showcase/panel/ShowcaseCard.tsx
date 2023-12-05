'use client'

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  ToggleButton,
  Typography,
} from '@mui/material'
import { MouseEvent, useCallback, useState } from 'react'
import useMedia from '@/hook/useMedia'
import { ICardData } from './types'
import useAxiosWithAuth from '@/api/config'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import FavoriteIcon from '@mui/icons-material/Favorite'

const ShowcaseCard = ({ data }: { data: ICardData | undefined }) => {
  const { isPc } = useMedia()
  const [isTouched, setIsTouched] = useState(false)
  const axiosWithAuth = useAxiosWithAuth()

  const handleCardClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsTouched(!isTouched)
  }

  const clickLike = useCallback(() => {
    if (!data) return alert('로그인이 필요합니다.')
    axiosWithAuth
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/like/${data.id}`,
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          data.like = res.data.like
        }
      })
  }, [data, axiosWithAuth])

  const clickFavorite = useCallback(() => {
    if (!data) return alert('로그인이 필요합니다.')
    axiosWithAuth
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/favorite/${data.id}`,
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          data.favorite = true
        }
      })
  }, [data, axiosWithAuth])

  if (isPc) {
    return (
      <Stack direction={'row'} spacing={10}>
        <Card
          sx={{
            height: isTouched ? '80%' : '30%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            width: '20rem',
          }}
        >
          {data !== undefined ? (
            <CardActions onClick={handleCardClick}>
              <CardContent>
                <Stack direction={'row'} spacing={10}>
                  <Stack direction={'row'} spacing={1}>
                    <Typography>팀 이미지</Typography>
                    <Typography>팀 이름: {data.name}</Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <IconButton
                      onClick={clickLike}
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <ThumbUpIcon />
                    </IconButton>
                    <Typography>{data.like}</Typography>
                  </Stack>
                  <Stack>
                    <Typography>관심 추가</Typography>
                    <ToggleButton
                      value={data.favorite}
                      onClick={clickFavorite}
                      selected={data.favorite}
                      color="primary"
                    >
                      <FavoriteIcon />
                    </ToggleButton>
                  </Stack>
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
      {data === undefined ? (
        <>
          <Avatar
            src="/images/icons/icon-192x192.png"
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
            <Typography>데이터가 없습니다.</Typography>
          </Card>
        </>
      ) : (
        <>
          <Avatar
            src={data ? data.image! : '/images/icons/icon-192x192.png'}
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
                  <Stack direction={'row'}>
                    <IconButton onClick={clickLike}>
                      <ThumbUpIcon />
                    </IconButton>
                    <Typography>{data.like}</Typography>
                  </Stack>
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
