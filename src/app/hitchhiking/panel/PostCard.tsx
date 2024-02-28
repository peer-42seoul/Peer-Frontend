import {
  Card,
  CardContent,
  CardHeader,
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
import CuPhotoBox from '@/components/CuPhotoBox'

function PostCard({
  authorImage,
  teamName,
  title,
  tagList,
  image,
  sx,
  onClick,
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
    >
      <CardContent sx={style.cardMediaStyleBase}>
        <CuPhotoBox
          src={image}
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
              src={authorImage}
              sx={style.cardAuthorAvatarStyleBase}
            />
          }
          title={
            <Typography
              variant="Body2"
              color="text.alternative"
              sx={style.cardSubtitleStyleBase}
            >
              {teamName}
            </Typography>
          }
          sx={{ p: 0 }}
        />

        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="Body1"
            color="text.normal"
            sx={{
              ...style.cardTitleStyleBase,
              maxHeight: getLineCount(46, 22.5) * 22.5,
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
              maxHeight: getLineCount(46, 22.5) * 20 + 8,
              flexWrap: 'wrap',
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
                  sx={{
                    ...style.chipStyleBase,
                    backgroundColor: alpha(color, 0.3),
                  }}
                />
              )
            })}
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  )
}

export default PostCard
