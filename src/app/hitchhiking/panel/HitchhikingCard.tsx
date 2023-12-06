import CuButton from '@/components/CuButton'
import PostCard from '@/components/PostCard'
import { IPostCard } from '@/types/IPostCard'
import { CardContent, SxProps, Typography } from '@mui/material'
import { Box, Card, CardHeader, Chip, Stack } from '@mui/material'
import React from 'react'

const HitchhikingCardBack = ({
  postId,
  sx,
}: {
  postId: number
  sx?: SxProps
}) => {
  console.log(`HitchhikingCard Back API! ${postId}`)
  return (
    <Card
      sx={{
        backgroundColor: 'background.primary',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        ...sx,
      }}
    >
      <CardHeader>
        <Stack direction="row" justifyContent={'space-between'}>
          <Chip label="팀명" />
          <Box sx={{ backgroundColor: 'background.secondary' }}>menu</Box>
        </Stack>
      </CardHeader>
      <CardContent>
        <Typography variant="Body1" color="text.normal">
          title
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="Caption" color={'text.alternative'}>
          모집글 요약
        </Typography>
      </CardContent>
      <CardContent>
        <Box sx={{ backgroundColor: 'background.secondary' }}>Avatars</Box>
      </CardContent>
      <CardContent>
        <CuButton message="전체 보기" />
      </CardContent>
    </Card>
  )
}

const HitchhikingCard = ({
  authorImage,
  teamName,
  title,
  tagList,
  image,
  postId,
  sx,
}: IPostCard) => {
  return (
    <Box>
      <PostCard
        postId={postId}
        authorImage={authorImage}
        teamName={teamName}
        title={title}
        tagList={tagList}
        image={image}
        sx={sx}
      />
      <HitchhikingCardBack postId={postId} sx={sx} />
    </Box>
  )
}

export default HitchhikingCard
