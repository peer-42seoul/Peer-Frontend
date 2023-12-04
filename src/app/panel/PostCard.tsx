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

const PostCard = ({
  authorImage,
  teamName,
  title,
  tagList,
  image,
}: IPostCard) => {
  return (
    <Card
      sx={{
        backgroundColor: 'background.primary',
        width: '90vw',
        height: '55vh',
        borderRadius: '0.75rem',
        borderWidth: '0.0625rem',
        borderColor: 'line.base',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <CardMedia component="img" image={image} alt="post thumbnail" />
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

        <CardContent sx={{ px: 0 }}>
          <Typography variant="Body1" color="text.normal">
            {title}
          </Typography>
        </CardContent>
        <CardContent sx={{ px: 0 }}>
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
}

export default PostCard
