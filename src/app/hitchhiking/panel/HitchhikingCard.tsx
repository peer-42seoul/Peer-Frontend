'use client'
import useAxiosWithAuth from '@/api/config' // 백엔드 api 완성 이후 주석 해제
import PostCard from './PostCard'
import { ITag } from '@/types/IPostDetail'
import {
  Button,
  CardContent,
  SxProps,
  Typography,
  Card,
  CardHeader,
  Chip,
  Stack,
  CircularProgress,
  Box,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Members from './Members'
import DropdownMenu from '@/components/DropdownMenu'
import * as style from './HitchhikingCard.style'
import ShareMenuItem from '@/components/dropdownMenu/ShareMenuItem'
import ReportMenuItem from '@/components/dropdownMenu/ReportMenuItem'
import useToast from '@/states/useToast'
import DynamicToastViewer from '@/components/DynamicToastViewer'

interface IHitchhikingCardBack {
  content: string
  memberImage: Array<string | null>
  recruitmentQuota: number
}

const HitchhikingCardBack = ({
  postId,
  sx,
  onClick,
  flipped,
  isProject,
  title,
  currentDomain,
  authorId,
}: {
  postId: number
  sx?: SxProps
  onClick?: (e: React.MouseEvent) => void
  flipped?: boolean
  isProject?: boolean
  title: string
  currentDomain: string
  authorId: number
}) => {
  const [data, setData] = useState<IHitchhikingCardBack | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [lineCount, setLineCount] = useState({
    title: 1,
    content: 1,
  })
  const router = useRouter()
  const card = useRef<HTMLDivElement>(null)

  const { openToast, closeToast } = useToast()

  useEffect(() => {
    setLineCount({
      title: getLineCount(46, 22.5, 2),
      content: getLineCount(191, 18, 8),
    })
  }, [card])

  useEffect(() => {
    const handleResize = () => {
      if (card.current) {
        setLineCount({
          title: getLineCount(46, 22.5, 2),
          content: getLineCount(191, 18, 8),
        })
      }
    }

    addEventListener('resize', handleResize)
    return () => {
      removeEventListener('resize', handleResize)
    }
  }, [])

  const getLineCount = (
    originHeight: number,
    lineHeight: number,
    maxLine: number,
  ) => {
    const removeCount = card.current?.clientHeight ?? 0 < 441 ? 2 : 1
    const lineCount = Math.floor(
      ((card.current?.clientHeight ?? 0) * originHeight) / lineHeight / 441,
    )
    if (lineCount > maxLine) return maxLine
    else if (lineCount < 1 + removeCount) return 1
    else return lineCount - removeCount
  }

  const axiosInstance = useAxiosWithAuth()

  useEffect(() => {
    const fetchData = async () => {
      closeToast()
      setIsLoading(true)
      await axiosInstance
        .get(`/api/v1/hitch/${postId}`)
        .then((res) => {
          setData(res.data)
        })
        .catch((e) => {
          if (e.response?.status === 500 || !e.response?.message) {
            openToast({
              severity: 'error',
              message: '알 수 없는 오류가 발생하였습니다.',
            })
          } else {
            openToast({
              severity: 'error',
              message: e.response?.message,
            })
          }
        })
      setIsLoading(false)
    }
    if (!isLoading && !data && flipped) fetchData()
  }, [flipped])

  const handleSeeAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/recruit/${postId}?type=${isProject ? 'PROJECT' : 'STUDY'}`)
  }

  return (
    <Card
      sx={{
        ...sx,
        transform: 'rotateY(180deg) translate(50%, 0)',
        backfaceVisibility: 'hidden',
        padding: '1rem',
      }}
      key={crypto.randomUUID()}
      ref={card}
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
          <CardContent sx={{ padding: 0 }} onClick={onClick}>
            <Stack
              direction="row"
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={style.cardHeaderStyleBase}
            >
              <Chip
                label={
                  <Typography variant="Tag" color={'green.normal'}>
                    {isProject ? '프로젝트' : '스터디'}
                  </Typography>
                }
                sx={style.cardChipStyleBase}
              />
              <DropdownMenu rotateOn>
                <ShareMenuItem
                  url={`${currentDomain}/recruit/${postId}`}
                  title={title}
                  content="피어에서 동료를 구해보새요!"
                  message={`피어에서 동료를 구해보세요! 이런 프로젝트가 있어요! ${currentDomain}/recruit/${postId}`}
                />
                <ReportMenuItem targetId={authorId} />
              </DropdownMenu>
            </Stack>
          </CardContent>
          <CardHeader
            title={
              <Typography
                variant="Body1"
                color={'text.normal'}
                sx={{
                  ...style.cardTitleStyleBase,
                  WebkitLineClamp: lineCount.title,
                }}
              >
                {title}
              </Typography>
            }
            sx={{ padding: 0, maxHeight: '3rem' }}
            onClick={onClick}
          ></CardHeader>
          <CardContent
            sx={{
              flexGrow: 1,
              padding: 0,
            }}
            onClick={onClick}
          >
            <Box width={1} height={'fit-content'}>
              <DynamicToastViewer
                initialValue={data.content}
                typographySx={{
                  fontSize: '0.75rem',
                  color: 'text.alternative',
                  margin: 0,
                  lineHeight: '1.125rem',
                  marginBlockStart: '0',
                  marginBlockEnd: '0',
                  marginTop: 0,
                }}
                sx={{
                  ...style.cardContentStyleBase,
                  WebkitLineClamp: lineCount.content,
                  '& .toastui-editor-contents > h1:first-of-type': {
                    marginTop: 0,
                  },
                  '.toastui-editor-contents h1': {
                    paddingBottom: 0,
                  },
                  '.toastui-editor-contents h2': {
                    paddingBottom: 0,
                  },
                }}
              />
            </Box>
          </CardContent>
          <CardContent sx={{ padding: 0 }} onClick={onClick}>
            <Members
              members={data.memberImage}
              recruitmentQuota={data.recruitmentQuota}
            />
          </CardContent>
          <CardContent
            sx={{
              position: 'relative',
              bottom: 0,
              height: '2.75rem',
              padding: 0,
              pb: 0,
            }}
            onClick={onClick}
          >
            <Button
              onClick={handleSeeAll}
              variant="contained"
              sx={style.cardMoreButtonStyle}
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
  authorId,
  teamName,
  title,
  tagList,
  image,
  postId,
  dragged,
  setDragged,
  isProject,
}: {
  authorImage: string
  authorId: number
  teamName: string
  title: string
  tagList: Array<ITag>
  image: string
  postId: number
  dragged: boolean
  setDragged: React.Dispatch<React.SetStateAction<boolean>>
  isProject?: boolean
}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentDomain, setCurrentDomain] = useState('')

  useEffect(() => {
    // 현재 도메인 설정
    setCurrentDomain(window.location.origin)
  }, [])

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
        transform: `rotateY(${isFlipped ? '180deg' : '0deg'})`,
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
          ...style.cardStyleBase,
          backfaceVisibility: 'hidden',
          transform: 'translate(-50%, 0)',
        }}
        onClick={handleMouseUp}
      />
      <HitchhikingCardBack
        authorId={authorId}
        postId={postId}
        sx={style.cardStyleBase}
        onClick={handleMouseUp}
        flipped={isFlipped}
        isProject={isProject}
        title={title}
        currentDomain={currentDomain}
      />
    </div>
  )
}

export default HitchhikingCard
