import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import { IPostCard } from '@/types/IPostCard'
import { ITag } from '@/types/IPostDetail'
import { Chip } from '@mui/material'
import useMedia from '@/hook/useMedia'
import CuAvatar from '@/components/CuAvatar'
import * as style from './PostCard.style'

const PostCard = React.forwardRef<HTMLDivElement, IPostCard>(function PostCard(
  {
    authorImage,
    teamName,
    title,
    tagList,
    image,
    sx,
    onClick,
    onMouseUp,
    onTouchEnd,
    cardWidth, // 모바일의 경우 width 기준으로 크기 조절을 하므로 무조건 있어야 합니다.
  }: IPostCard,
  ref,
) {
  const { isPc } = useMedia()
  const getHeight = (originHeight: number) => {
    const height = (cardWidth * originHeight) / 328 / 16
    return height > 2 ? `2rem` : `${height}rem`
  }

  const getLineCount = (originHeight: number, lineHeight: number) => {
    const lineCount = Math.floor((cardWidth * originHeight) / 328 / lineHeight)
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
          height: isPc ? '100%' : getHeight(251),
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
                width: isPc ? '2rem' : getHeight(32),
                height: isPc ? '2rem' : getHeight(32),
                boxSizing: 'border-box',
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

        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="Body1"
            color="text.normal"
            sx={{
              ...style.cardTitleStyleBase,
              height: isPc ? '46px' : getLineCount(46, 22.5) * 22.5,
              WebkitLineClamp: isPc ? 2 : getLineCount(46, 22.5),
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
              const r = parseInt(color.slice(1, 3), 16),
                g = parseInt(color.slice(3, 5), 16),
                b = parseInt(color.slice(5, 7), 16)
              const alpha = '0.3'
              const backgroundColor =
                'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'

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
                    backgroundColor: backgroundColor,
                    borderRadius: 2,
                    height: '1.25rem',
                  }}
                />
              )
            })}
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  )
})

export default PostCard
