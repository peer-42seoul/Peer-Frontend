'use client'
import PostCard from '@/components/PostCard'
import { ITag } from '@/types/IPostDetail'
import {
  Button,
  CardContent,
  SxProps,
  Typography,
  Box,
  Card,
  CardHeader,
  Chip,
  Stack,
} from '@mui/material'
import React, { useState } from 'react'

const HitchhikingCardBack = ({
  postId,
  sx,
  onClick,
}: {
  postId: number
  sx?: SxProps
  onClick?: (e: React.MouseEvent) => void
}) => {
  console.log(`HitchhikingCard Back API! ${postId}`)

  const handleSeeAllMouse = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('handleSeeAll')
  }

  return (
    <Card
      sx={{
        ...sx,
        // backgroundColor: 'background.primary',
        backgroundColor: 'text.normal',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        transform: 'rotateY(180deg) translate(50%, 0)',

        backfaceVisibility: 'hidden',
      }}
      // onTouchEnd={onTouchEnd}
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
        <Button onClick={handleSeeAllMouse}>전체 보기</Button>
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
  dragged,
  setDragged,
  sx,
}: {
  authorImage: string
  teamName: string
  title: string
  tagList: Array<ITag>
  image: string
  postId: number
  sx?: SxProps
  dragged: boolean
  setDragged: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!dragged) {
      setIsFlipped((prev) => !prev)
    }
    setDragged(false)
  }

  return (
    <div
      style={{
        transform: ` rotateY(${isFlipped ? '180deg' : '0deg'})`,
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
          transform: 'translate(-50%, 0)',
        }}
        onClick={handleMouseUp}
      />
      <HitchhikingCardBack postId={postId} sx={sx} onClick={handleMouseUp} />
    </div>
  )
}

export default HitchhikingCard
