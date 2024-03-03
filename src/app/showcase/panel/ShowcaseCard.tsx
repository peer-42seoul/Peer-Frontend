'use client'

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
  CardActionArea,
  Avatar,
  Box,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import DropdownMenu from '@/components/DropdownMenu'
import * as style from './ShowcaseCard.style'
import { ICardData } from '@/app/showcase/panel/types'
import PostCard from './PostCard'
import ShareMenuItem from '@/components/dropdownMenu/ShareMenuItem'
import ReportMenuItem from '@/components/dropdownMenu/ReportMenuItem'
import DynamicToastViewer from '@/components/DynamicToastViewer'

const ShowcaseCardBack = ({
  postId,
  sx,
  onClick,
  content,
  title,
  name,
  image,
}: {
  postId: number
  sx?: SxProps
  onClick?: (e: React.MouseEvent) => void
  flipped?: boolean
  title: string
  image: string | null
  name: string
  content: string
  currentDomain: string
}) => {
  const [lineCount, setLineCount] = useState({
    title: 1,
    content: 1,
  })
  const router = useRouter()
  const card = useRef<HTMLDivElement>(null)
  const [currentPageUrl, setCurrentPageUrl] = useState('')

  useEffect(() => {
    setLineCount({
      title: getLineCount(46, 22.5, 2),
      content: getLineCount(191, 18, 8),
    })
  }, [card])

  useEffect(() => {
    setCurrentPageUrl(window.location.href)

    const handleResize = () => {
      if (card.current) {
        setLineCount({
          title: getLineCount(46, 22.5, 2),
          content: getLineCount(191, 18, 8),
        })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
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

  const handleSeeAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/showcase/detail/${postId}`)
  }

  return (
    <Card
      sx={{
        ...sx,
        transform: 'rotateY(180deg) translate(50%, 0)',
        backfaceVisibility: 'hidden',
        padding: '1rem',
      }}
      ref={card}
    >
      {content ? (
        <Stack
          direction={'column'}
          justifyContent={'space-between'}
          alignItems={'stretch'}
          height={'100%'}
          width={'100%'}
          spacing={'1rem'}
        >
          <Stack
            direction="row"
            justifyContent={'space-between'}
            height={'2.5rem'}
            alignItems={'center'}
            sx={{ width: '100%' }}
          >
            <CardContent sx={{ padding: 0, flexGrow: 1 }} onClick={onClick}>
              <Chip
                label={
                  <Typography variant="Tag" color={'green.normal'}>
                    {'프로젝트'}
                  </Typography>
                }
                sx={style.cardChipStyleBase}
              />
            </CardContent>
            <CardActionArea sx={{ padding: 0, width: 'auto' }}>
              <DropdownMenu>
                <ShareMenuItem
                  title={title}
                  url={`${currentPageUrl}/showcase/detail/${postId}`}
                  content={'피어에서 맘에 드는 프로젝트를 공유해보세요!'}
                  message={`피어에서 맘에 드는 프로젝트를 공유해보세요! ${currentPageUrl}/showcase/detail/${postId}`}
                />

                <ReportMenuItem targetId={postId} />
              </DropdownMenu>
            </CardActionArea>
          </Stack>
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
            sx={{ padding: 0, maxHeight: '3rem', flexGrow: 1 }}
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
                initialValue={content}
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
            <Stack direction={'row'} spacing={'0.5rem'}>
              <Avatar
                src={image ? image : ''}
                sx={{ width: '1.5rem', height: '1.5rem' }}
              />
              <Typography color={'text.alternative'} width={'11rem'}>
                {name}
              </Typography>
            </Stack>
          </CardContent>
          <CardContent
            sx={{ position: 'relative', bottom: 0, height: '2.75rem' }}
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

const ShowcaseCard = ({
  data,
  dragged,
  setDragged,
  mutate,
}: {
  data: ICardData
  sx?: SxProps
  dragged: boolean
  setDragged: React.Dispatch<React.SetStateAction<boolean>>
  mutate: Dispatch<SetStateAction<ICardData[]>>
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
        transform: ` rotateY(${isFlipped ? '180deg' : '0deg'})`,
        transformStyle: 'preserve-3d',
        width: '100%',
        height: '100%',
        transition: 'transform 0.5s ease',
      }}
    >
      <PostCard
        postId={data.id}
        authorImage={data.teamLogo}
        title={data.name}
        teamName={data.name}
        tagList={data.skill}
        image={data.image ? data.image : '/image/logo.png'}
        isFavorite={data.favorite}
        like={data.like}
        liked={data.liked}
        sx={{
          ...style.cardStyleBase,
          backfaceVisibility: 'hidden',
          transform: 'translate(-50%, 0)',
        }}
        onClick={handleMouseUp}
        mutate={mutate}
      />
      <ShowcaseCardBack
        postId={data.id}
        sx={style.cardStyleBase}
        onClick={handleMouseUp}
        flipped={isFlipped}
        title={data.name}
        image={data.image}
        name={data.name}
        content={data.description}
        currentDomain={currentDomain}
      />
    </div>
  )
}

export { ShowcaseCard, ShowcaseCardBack }
