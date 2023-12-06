'use client'
import CuButton from '@/components/CuButton'
import PostCard from '@/components/PostCard'
import { IPostCard } from '@/types/IPostCard'
import { CardContent, SxProps, Typography } from '@mui/material'
import { Box, Card, CardHeader, Chip, Stack } from '@mui/material'
import React, { useState } from 'react'

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
        ...sx,
        backgroundColor: 'text.normal',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        transform: 'rotateY(180deg)',
        // backfaceVisibility: 'hidden',
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
  const [isFlipped, setFlipped] = useState(false)

  return (
    <div
      style={{
        transform: `rotateY(${isFlipped ? '180deg' : '0deg'})`,
        width: '100%',
        height: '100%',
        transition: 'transform 0.5s ease',
      }}
      onClick={() => setFlipped(!isFlipped)}
    >
      <PostCard
        postId={postId}
        authorImage={authorImage}
        teamName={teamName}
        title={title}
        tagList={tagList}
        image={image}
        sx={{
          ...sx,
          backfaceVisibility: 'hidden',
          opacity: isFlipped ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      />
      <HitchhikingCardBack
        postId={postId}
        sx={{
          ...sx,
          opacity: isFlipped ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  )
}

export default HitchhikingCard
