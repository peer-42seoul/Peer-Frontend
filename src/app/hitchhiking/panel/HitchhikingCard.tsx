'use client'
import PostCard from '@/components/PostCard'
import { IPostCard } from '@/types/IPostCard'
import { Button, CardContent, SxProps, Typography } from '@mui/material'
import { Box, Card, CardHeader, Chip, Stack } from '@mui/material'
import React, { useState } from 'react'

const HitchhikingCardBack = ({
  postId,
  sx,
  onClick,
}: {
  postId: number
  sx?: SxProps
  onClick?: () => void
}) => {
  console.log(`HitchhikingCard Back API! ${postId}`)

  const handleSeeAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('handleSeeAll')
  }
  return (
    <Card
      sx={{
        ...sx,
        backgroundColor: 'text.normal',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
      }}
      onClick={onClick}
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
        <Button onClick={handleSeeAll}>전체 보기</Button>
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
        transform: `perspective(800px) rotateY(${
          isFlipped ? '180deg' : '0deg'
        })`,
        transformStyle: 'preserve-3d',
        width: '100%',
        height: '100%',
        transition: 'transform 0.5s ease',
      }}
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
        }}
        onClick={() => setFlipped(!isFlipped)}
      />
      <HitchhikingCardBack
        postId={postId}
        sx={{
          ...sx,
        }}
        onClick={() => setFlipped(!isFlipped)}
      />
    </div>
  )
}

export default HitchhikingCard
