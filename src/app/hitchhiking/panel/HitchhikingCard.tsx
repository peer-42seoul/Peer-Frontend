'use client'
// import useAxiosWithAuth from '@/api/config' // 백엔드 api 완성 이후 주석 해제
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
  CircularProgress,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

interface IHitchhikingCardBack {
  content: string
  memberImage: Array<{ url: string }>
  recruitmentQuota: number
}

const HitchhikingCardBack = ({
  postId,
  sx,
  onClick,
  flipped,
  isProject,
}: {
  postId: number
  sx?: SxProps
  onClick?: (e: React.MouseEvent) => void
  flipped?: boolean
  isProject?: boolean
}) => {
  const [data, setData] = useState<IHitchhikingCardBack | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const axiosInstance = useAxiosWithAuth()

  useEffect(() => {
    const fetchData = async () => {
      console.log(`fetchData ${postId}`)
      setIsLoading(true)
      // backend api 완성 이후 주석 해제
      // await axiosInstance
      //   .get(`/api/v1/hitch/${postId}`)
      //   .then((res) => {
      //     setData(res.data)
      //   })
      //   .catch((e) => {
      //     console.log(e)
      //   })
      setData({
        content: 'content',
        memberImage: [{ url: 'https://picsum.photos/200' }],
        recruitmentQuota: 8,
      })
      setIsLoading(false)
    }
    if (!isLoading && !data && flipped) fetchData()
  }, [flipped])

  const handleSeeAllMouse = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('handleSeeAll')
  }

  return (
    <Card
      sx={{
        ...sx,
        backgroundColor: 'background.primary',
        // backgroundColor: 'text.normal',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        transform: 'rotateY(180deg) translate(50%, 0)',

        backfaceVisibility: 'hidden',
      }}
      // onTouchEnd={onTouchEnd}
      onClick={onClick}
    >
      {data ? (
        <>
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
              {data.content}
            </Typography>
          </CardContent>
          <CardContent>
            <Box sx={{ backgroundColor: 'background.secondary' }}>Avatars</Box>
          </CardContent>
          <CardContent>
            <Button onClick={handleSeeAllMouse}>전체 보기</Button>
          </CardContent>
        </>
      ) : (
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          width={1}
          height={1}
        >
          <CircularProgress />
        </Stack>
      )}
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
  isProject,
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
  isProject?: boolean
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
      <HitchhikingCardBack
        postId={postId}
        sx={sx}
        onClick={handleMouseUp}
        flipped={isFlipped}
        isProject={isProject}
      />
    </div>
  )
}

export default HitchhikingCard
