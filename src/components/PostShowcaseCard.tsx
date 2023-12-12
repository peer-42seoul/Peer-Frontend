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
import { IPostCard, IPostCardShowcase } from '@/types/IPostCard'
import { ITag } from '@/types/IPostDetail'
import { Chip } from '@mui/material'
import { IShowcaseTag } from '@/app/showcase/panel/types'

const PostShowcaseCard = React.forwardRef<HTMLDivElement, IPostCardShowcase>(
  function PostCard(
    { authorImage, teamName, title, tagList, image, sx }: IPostCardShowcase,
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
      >
        <Box
          component="img"
          src={image}
          alt="post thumbnail"
          sx={{ flexGrow: 1, objectFit: 'cover' }}
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
              {tagList?.map(({ name }: IShowcaseTag, idx: number) => {
                return (
                  <Chip
                    label={<Typography variant="Tag">{name}</Typography>}
                    size="small"
                    key={idx}
                    style={{
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
  },
)

export default PostShowcaseCard
