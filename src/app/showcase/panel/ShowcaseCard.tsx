'use client'

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  SvgIcon,
  ToggleButton,
  Typography,
} from '@mui/material'
import { MouseEvent, useCallback, useState } from 'react'
import useMedia from '@/hook/useMedia'
import { ICardData } from './types'
import useAxiosWithAuth from '@/api/config'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import FavoriteIcon from '@mui/icons-material/Favorite'

function leftPad(value: number) {
  if (value >= 10) {
    return value
  }

  return `0${value}`
}

function toStringByFormatting(source: Date, delimiter = '-') {
  const year = source.getFullYear()
  const month = leftPad(source.getMonth() + 1)
  const day = leftPad(source.getDate())

  return [year, month, day].join(delimiter)
}

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
          if (data.like < res.data.like) {
            data.liked = true
          } else {
            data.liked = false
          }
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
            height: '36rem',
            backgroundColor: 'primary',
            width: '25rem',
          }}
        >
          {data !== undefined ? (
            <CardActions onClick={handleCardClick}>
              <CardContent>
                <Stack spacing={3}>
                  <Stack direction={'row'} height={'1.5rem'}>
                    <Stack direction={'row'} spacing={1}>
                      <Avatar
                        src={data.image!}
                        sx={{ width: '1.5rem', height: '1.5rem' }}
                      />
                      <Typography width={'11rem'}>{data.name}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                      <IconButton
                        onClick={clickLike}
                        color="primary"
                        size="small"
                      >
                        <ThumbUpIcon />
                      </IconButton>
                      <Typography>{data.like}</Typography>

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
                  <Stack minHeight={'22.5rem'}>
                    <Typography>{data.description}</Typography>
                  </Stack>
                  <Stack>
                    <Stack direction={'row'} spacing={2}>
                      <Stack direction={'row'} spacing={1}>
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M12.6667 2.67188H3.33333C2.59695 2.67188 2 3.26883 2 4.00521V13.3385C2 14.0749 2.59695 14.6719 3.33333 14.6719H12.6667C13.403 14.6719 14 14.0749 14 13.3385V4.00521C14 3.26883 13.403 2.67188 12.6667 2.67188Z"
                              stroke="#9B9B9B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.6641 1.32812V3.99479"
                              stroke="#9B9B9B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.33594 1.32812V3.99479"
                              stroke="#9B9B9B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 6.67188H14"
                              stroke="#9B9B9B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </SvgIcon>
                        <Typography>
                          시작일: {toStringByFormatting(new Date(data.start))}
                        </Typography>
                      </Stack>
                      <Stack direction={'row'} spacing={1}>
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M12.6667 2.67188H3.33333C2.59695 2.67188 2 3.26883 2 4.00521V13.3385C2 14.0749 2.59695 14.6719 3.33333 14.6719H12.6667C13.403 14.6719 14 14.0749 14 13.3385V4.00521C14 3.26883 13.403 2.67188 12.6667 2.67188Z"
                              stroke="#9B9B9B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.6641 1.32812V3.99479"
                              stroke="#9B9B9B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.33594 1.32812V3.99479"
                              stroke="#9B9B9B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 6.67188H14"
                              stroke="#9B9B9B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </SvgIcon>
                        <Typography>종료일:</Typography>
                        <Typography>
                          {toStringByFormatting(new Date(data.end))}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography>기술 스택</Typography>
                  </Stack>
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
