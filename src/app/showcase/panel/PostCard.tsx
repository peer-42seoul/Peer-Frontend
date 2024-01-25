import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
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
}: IPostCardShowcase) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [currentCardWidth, setCurrentCardWidth] = useState<number>(0)
  const [favorite, setFavorite] = useState<boolean>(isFavorite)
  const [likeNum, setLikeNum] = useState<number>(like)
  const [isLiked, setIsLiked] = useState<boolean>(liked)
  const axiosWithAuth = useAxiosWithAuth()

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/favorite/${postId}`,
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          setFavorite(!favorite)
        }
      })
  }, [isFavorite, axiosWithAuth])

  const clickLike = useCallback(() => {
    axiosWithAuth
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/like/${postId}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          if (like < res.data.like) {
            setIsLiked(true)
          } else {
            setIsLiked(false)
          }
          setLikeNum(res.data.like)
        }
      })
  }, [like, liked, axiosWithAuth])

  return (
    <Card
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        backfaceVisibility: 'hidden',
      }}
      ref={ref}
      // onClick={onClick}
    >
      <CardMedia
        component="img"
        image={image ? image : '/icons/52.png'}
        alt="post thumbnail"
        sx={{
          ...style.cardMediaStyleBase,
          height: (currentCardWidth * 251) / 328,
        }}
      />
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
        <CardActionArea onClick={onClick}>
          <Box
            sx={{
              height: (currentCardWidth * 190) / 328,
              boxSizing: 'border-box',
            }}
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
        </CardActionArea>
      </Stack>
    </Card>
  )
}

export default PostCard
