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
  title,
}: {
  postId: number
  sx?: SxProps
  onClick?: (e: React.MouseEvent) => void
  flipped?: boolean
  isProject?: boolean
  title: string
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
        content:
          '모집글의 요약형태가 이 곳에 보여집니다. 모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다. 모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.\n\n모집글의 요약형태가 이 곳에 보여집니다. 모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다. 모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.',
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
        transform: 'rotateY(180deg) translate(50%, 0)',
        backfaceVisibility: 'hidden',
        padding: '1rem',
      }}
      onClick={onClick}
    >
      {data ? (
        <Stack
          direction={'column'}
          justifyContent={'space-between'}
          alignItems={'stretch'}
          height={'100%'}
          width={'100%'}
          spacing={'1rem'}
        >
          <CardContent sx={{ padding: 0 }}>
            <Stack
              direction="row"
              justifyContent={'space-between'}
              height={'2.5rem'}
              alignItems={'center'}
            >
              <Chip
                label={
                  <Typography variant="Tag" color={'green.normal'}>
                    {isProject ? '프로젝트' : '스터디'}
                  </Typography>
                }
                sx={{
                  height: '1.25rem',
                  padding: '0 6px',
                  backgroundColor: 'background.tertiary',
                  borderRadius: '2px',
                  '& .MuiChip-label': {
                    padding: '0px',
                  },
                }}
              />
              <Box sx={{ backgroundColor: 'background.secondary' }}>menu</Box>
            </Stack>
          </CardContent>
          <CardHeader
            title={
              <Typography variant="Body1" color={'text.normal'}>
                {title}
              </Typography>
            }
            sx={{ padding: 0, maxHeight: '3rem', flexGrow: 1 }}
          ></CardHeader>
          <CardContent
            sx={{
              flexGrow: 1,
              padding: 0,
              // textOverflow: 'ellipsis',
              // whiteSpace: 'pre-wrap',
            }}
          >
            <Typography
              variant="Caption"
              color={'text.alternative'}
              // component={'div'}
              sx={{
                width: '100%',
                overflow: 'hidden',
                height: '12rem',
                lineHeight: '1.2rem',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 10 /* 라인수 */,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {data.content.split('\n').map((line) => {
                return (
                  <>
                    {line}
                    <br />
                  </>
                )
              })}
            </Typography>
          </CardContent>
          <CardContent>
            <Box sx={{ backgroundColor: 'background.secondary' }}>Avatars</Box>
          </CardContent>
          <CardContent
          // sx={{ width: '100%', height: '0.5rem', position: 'relative' }}
          >
            <Button
              onClick={handleSeeAllMouse}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              전체 보기
            </Button>
          </CardContent>
        </Stack>
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
        title={title}
      />
    </div>
  )
}

export default HitchhikingCard
