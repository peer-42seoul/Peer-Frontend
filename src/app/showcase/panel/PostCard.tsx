import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
  alpha,
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { IPostCardShowcase } from '@/types/IPostCard'
import { Chip } from '@mui/material'
import CuAvatar from '@/components/CuAvatar'
import * as style from './PostCard.style'
import { IShowcaseTag } from './types'
import useAxiosWithAuth from '@/api/config'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CuPhotoBox from '@/components/CuPhotoBox'

function PostCard({
  postId,
  authorImage,
  teamName,
  title,
  tagList,
  image,
  sx,
  like,
  liked,
  isFavorite,
  onClick,
  mutate,
}: IPostCardShowcase) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [currentCardWidth, setCurrentCardWidth] = useState<number>(0)
  const [favorite, setFavorite] = useState<boolean>(false)
  const [likeNum, setLikeNum] = useState<number>(0)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const axiosWithAuth = useAxiosWithAuth()

  useEffect(() => {
    setFavorite(isFavorite)
    setLikeNum(like)
    setIsLiked(liked)
  }, [like, liked, isFavorite])

  useEffect(() => {
    if (ref.current) {
      setCurrentCardWidth(ref.current.clientWidth)
    }
  }, [ref, ref.current?.clientWidth])

  const getLineCount = (originHeight: number, lineHeight: number) => {
    const lineCount = Math.floor(
      (currentCardWidth || 328 * originHeight) / 328 / lineHeight,
    )
    return lineCount ? lineCount : 1
  }

  const clickFavorite = useCallback(() => {
    axiosWithAuth
      .post(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/favorite/${postId}`,
      )
      .then((res) => {
        if (res.status === 200) {
          mutate((prev) => {
            return prev.map((card) => {
              if (card.id === postId) {
                return {
                  ...card,
                  favorite: !favorite,
                }
              }
              return card
            })
          })
        }
      })
      .catch(() => {})
  }, [favorite, setFavorite, mutate])

  const clickLike = useCallback(() => {
    axiosWithAuth
      .post(`${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/like/${postId}`)
      .then((res) => {
        if (res.status === 200) {
          if (isLiked === false) {
            mutate((prev) => {
              return prev.map((card) => {
                if (card.id === postId) {
                  return {
                    ...card,
                    like: likeNum + 1,
                    liked: !isLiked,
                  }
                }
                return card
              })
            })
          } else {
            mutate((prev) => {
              return prev.map((card) => {
                if (card.id === postId) {
                  return {
                    ...card,
                    like: likeNum - 1,
                    liked: !isLiked,
                  }
                }
                return card
              })
            })
          }
        }
      })
      .catch(() => {})
  }, [isLiked, likeNum, setLikeNum, setIsLiked])

  return (
    <Card
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        backfaceVisibility: 'hidden',
      }}
      ref={ref}
    >
      <CardContent sx={style.cardMediaStyleBase} onClick={onClick}>
        <CuPhotoBox
          src={image ? image : '/icons/52.png'}
          alt="post thumbnail"
          style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}
        />
      </CardContent>

      <Stack
        sx={{ p: '1rem', pt: '0.75rem' }}
        spacing={'15px'}
        maxHeight={'11.875rem'}
      >
        <CardHeader
          avatar={
            <CuAvatar
              aria-label="profile"
              src={authorImage!}
              sx={{
                ...style.cardAuthorAvatarStyleBase,
                height: (currentCardWidth * 32) / 328,
                width: (currentCardWidth * 32) / 328,
              }}
            />
          }
          title={
            <Typography variant="Body2" color="text.alternative">
              {teamName}
            </Typography>
          }
          action={
            <Stack direction={'row'} spacing={'1rem'} padding={'0.5rem'}>
              <Stack direction={'row'} spacing={'0.5rem'}>
                <IconButton
                  onClick={clickLike}
                  color={isLiked ? 'primary' : 'inherit'}
                  size="small"
                  sx={{
                    m: 0,
                    p: 0,
                  }}
                >
                  <ThumbUpIcon />
                </IconButton>
                <Typography>{likeNum}</Typography>
              </Stack>

              <IconButton
                onClick={clickFavorite}
                color={favorite ? 'primary' : 'inherit'}
                size="small"
                sx={{
                  m: 0,
                  p: 0,
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </Stack>
          }
          sx={{ p: 0 }}
        />

        <Box
          sx={{
            height: (currentCardWidth * 190) / 328,
            boxSizing: 'border-box',
          }}
          onClick={onClick}
        >
          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="Body1"
              color="text.normal"
              sx={{
                ...style.cardTitleStyleBase,
                height: getLineCount(46, 22.5) * 22.5,
                WebkitLineClamp: getLineCount(46, 22.5),
              }}
            >
              {title}
            </Typography>
          </CardContent>
          <CardContent sx={{ p: 0 }}>
            <Stack
              gap={1}
              direction={'row'}
              sx={{
                overflow: 'hidden',
                height: getLineCount(46, 22.5) * 20 + 8,
              }}
            >
              {tagList?.map(({ name, color }: IShowcaseTag, idx: number) => {
                return (
                  <Chip
                    label={<Typography variant="Tag">{name}</Typography>}
                    size="small"
                    key={idx}
                    style={{
                      backgroundColor: alpha(color, 0.3),
                      borderRadius: 2,
                      height: '1.25rem',
                    }}
                  />
                )
              })}
            </Stack>
          </CardContent>
        </Box>
      </Stack>
    </Card>
  )
}

export default PostCard
