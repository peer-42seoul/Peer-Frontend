import {
  Avatar,
  Box,
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
  }: IPostCard,
  ref,
) {
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
        sx={{ flexGrow: 1, objectFit: 'cover', maxHeight: '15.6875rem' }}
      />
      <Stack
        sx={{ p: '1rem', pt: '0.75rem' }}
        spacing={'15px'}
        maxHeight={'11.875rem'}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="profile">
              <Box
                component="img"
                src={authorImage}
                alt="profile image"
                width={'2rem'}
                height={'2rem'}
              />
            </Avatar>
          }
          title={
            <Typography variant="Body2" color="text.alternative">
              {teamName}
            </Typography>
          }
          sx={{ p: 0 }}
        />

        <CardContent sx={{ p: 0 }}>
          <Typography variant="Body1" color="text.normal">
            {title}
          </Typography>
        </CardContent>
        <CardContent sx={{ p: 0 }}>
          <Stack gap={1} direction={'row'} justifyContent={'center'}>
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
