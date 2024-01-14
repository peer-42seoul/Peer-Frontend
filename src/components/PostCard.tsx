import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
  alpha,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IPostCard } from '@/types/IPostCard'
import { ITag } from '@/types/IPostDetail'
import { Chip } from '@mui/material'
import CuAvatar from '@/components/CuAvatar'
import * as style from './PostCard.style'

function PostCard({
  authorImage,
  teamName,
  title,
  tagList,
  image,
  sx,
  onClick,
  onMouseUp,
  onTouchEnd,
}: IPostCard) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [currentCardWidth, setCurrentCardWidth] = useState<number>(0)

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

  return (
    <Card
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        backfaceVisibility: 'hidden',
      }}
      ref={ref}
      onClick={onClick}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
    >
      <CardMedia
        component="img"
        image={image}
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
              src={authorImage}
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
          sx={{ p: 0 }}
        />
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
              justifyContent={'center'}
              sx={{
                overflow: 'hidden',
                height: getLineCount(46, 22.5) * 20 + 8,
              }}
            >
              {tagList?.map(({ name, color }: ITag, idx: number) => {
                return (
                  <Chip
                    label={
                      <Typography variant="Tag" color={color}>
                        {name}
                      </Typography>
                    }
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
