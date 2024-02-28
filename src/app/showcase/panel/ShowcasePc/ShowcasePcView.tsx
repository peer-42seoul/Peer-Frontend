'use client'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Menu,
  Stack,
  Typography,
} from '@mui/material'
import { ICardData } from '../types'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { CalendarIcon, TagIcon, ThreeDotsIcon } from '../icons'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import useAxiosWithAuth from '@/api/config'
import TagChip from '@/components/TagChip'
import { useRouter } from 'next/navigation'
import NoDataDolphin from '@/components/NoDataDolphin'
import DynamicToastViewer from '@/components/DynamicToastViewer'
import ShareMenuItem from '@/components/dropdownMenu/ShareMenuItem'
import ReportMenuItem from '@/components/dropdownMenu/ReportMenuItem'
import CuAvatar from '@/components/CuAvatar'

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

const ShowcasePcView = ({ data }: { data: ICardData | undefined }) => {
  const [isLiked, setIsLiked] = useState<boolean | undefined>(data?.liked)
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(
    data?.favorite,
  )
  const router = useRouter()
  const [isTouched, setIsTouched] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const axiosWithAuth = useAxiosWithAuth()
  const handleCardClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsTouched(!isTouched)
  }

  useEffect(() => {
    setIsLiked(data?.liked)
    setIsFavorite(data?.favorite)
  }, [data, isLiked])

  const clickLike = useCallback(() => {
    if (!data) return alert('로그인이 필요합니다.')
    axiosWithAuth
      .post(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/like/${data.id}`,
      )
      .then((res) => {
        if (res.status === 200) {
          if (isLiked === false) {
            data.liked = true
            setIsLiked(true)
            data.like = data.like + 1
          } else {
            data.liked = false
            setIsLiked(false)
            data.like = data.like - 1
          }
        }
      })
  }, [data, axiosWithAuth, setIsLiked])

  const clickFavorite = useCallback(() => {
    if (!data) return alert('로그인이 필요합니다.')
    axiosWithAuth
      .post(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/favorite/${data.id}`,
      )
      .then((res) => {
        if (res.status === 200) {
          if (isFavorite === false) {
            data.favorite = true
            setIsFavorite(true)
          } else {
            data.favorite = false
            setIsFavorite(false)
          }
        }
      })
  }, [setIsFavorite, axiosWithAuth])

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  return (
    <Stack direction={'row'} spacing={10}>
      <Card
        sx={{
          height: '37rem',
          backgroundColor: 'background.tertiary',
          width: '30rem',
          py: '1rem',
        }}
      >
        {data !== undefined ? (
          <CardActions onClick={handleCardClick}>
            <CardContent sx={{ margin: 'auto', padding: 0 }}>
              <Stack spacing={'1.5rem'}>
                <Stack
                  direction={'row'}
                  height={'1.5rem'}
                  justifyContent={'space-between'}
                >
                  <Stack direction={'row'} spacing={'0.5rem'}>
                    <CuAvatar
                      src={data.teamLogo ?? undefined}
                      sx={{ width: '1.5rem', height: '1.5rem' }}
                    />
                    <Typography color={'text.alternative'} width={'11rem'}>
                      {data.name}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={'1rem'}>
                    <Stack direction={'row'} spacing={'0.5rem'}>
                      <IconButton
                        onClick={clickLike}
                        color={isLiked ? 'primary' : 'default'}
                        size="small"
                        sx={{
                          m: 0,
                          p: 0,
                        }}
                      >
                        <ThumbUpIcon />
                      </IconButton>
                      <Typography>{data.like}</Typography>
                    </Stack>

                    <IconButton
                      onClick={clickFavorite}
                      color={data.favorite ? 'primary' : 'default'}
                      size="small"
                      sx={{
                        m: 0,
                        p: 0,
                      }}
                    >
                      <FavoriteIcon />
                    </IconButton>

                    <IconButton
                      color="inherit"
                      sx={{
                        m: 0,
                        p: 0,
                      }}
                      onClick={handleMenuOpen}
                    >
                      <ThreeDotsIcon />
                    </IconButton>
                    <Menu
                      open={open}
                      onClose={handleMenuClose}
                      anchorEl={anchorEl}
                    >
                      <ShareMenuItem
                        title={data.name}
                        url={`/showcase/${data.id}`}
                        content={data.description}
                      />

                      <ReportMenuItem targetId={data.id} />
                    </Menu>
                  </Stack>
                </Stack>
                {/* <Stack
                  height={'20rem'}
                  width={'28rem'}
                  whiteSpace={'normal'}
                  overflow={'hidden'}
                  textOverflow={'ellipsis'}
                >
                  <Typography sx={{ wordBreak: 'break-word' }}>
                    {data.description}
                  </Typography>
                </Stack> */}
                <Stack
                  height={'20rem'}
                  width={'28rem'}
                  whiteSpace={'normal'}
                  overflow={'hidden'}
                  textOverflow={'ellipsis'}
                >
                  <DynamicToastViewer
                    initialValue={data.description}
                    sx={{
                      width: '100%',
                      wordBreak: 'break-word',
                      height: '20rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </Stack>
                <Stack alignItems={'center'}>
                  <Button
                    variant="text"
                    color="primary"
                    sx={{ width: 'fit-content' }}
                    onClick={() => router.push(`/showcase/detail/${data.id}`)}
                  >
                    <Typography noWrap variant="caption">
                      전체 글 보기
                    </Typography>
                  </Button>
                </Stack>
                <Stack spacing={'0.25rem'}>
                  <Stack
                    direction={'row'}
                    spacing={'1rem'}
                    textAlign={'center'}
                  >
                    <Stack direction={'row'} spacing={'0.5rem'}>
                      <CalendarIcon />
                      <Typography color={'text.alternative'}>시작일</Typography>
                      <Typography>
                        {toStringByFormatting(new Date(data.start))}
                      </Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={'0.5rem'}>
                      <CalendarIcon />
                      <Typography color={'text.alternative'}>종료일</Typography>
                      <Typography>
                        {toStringByFormatting(new Date(data.end))}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    direction={'row'}
                    spacing={'1rem'}
                    textAlign={'center'}
                  >
                    <Stack direction={'row'} spacing={'0.5rem'}>
                      <TagIcon />
                      <Typography color={'text.alternative'}>
                        관련 태그
                      </Typography>

                      {data.skill.map((skill, index) => (
                        <TagChip
                          key={index}
                          name={skill.name}
                          color={skill.color}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </CardActions>
        ) : (
          <Stack
            width={'25rem'}
            height={'37rem'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <NoDataDolphin
              message="비어있네요 😭"
              backgroundColor="background.tertiray"
            />
          </Stack>
        )}
      </Card>
    </Stack>
  )
}

export default ShowcasePcView
