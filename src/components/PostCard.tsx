import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
  alpha,
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
    cardWidth, // width 기준으로 text overflow를 조절하므로 꼭 필요합니다.
  }: IPostCard,
  ref,
) {
  const { isPc } = useMedia()

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
        sx={isPc ? style.cardMediaPcStyle : style.cardMediaMobileStyle}
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
              sx={style.cardAuthorAvatarStyle}
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
      </Stack>
    </Card>
  )
})

export default PostCard
