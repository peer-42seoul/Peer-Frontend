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
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import DropdownMenu from '@/components/DropdownMenu'
import useMedia from '@/hook/useMedia'
import * as style from './ShowcaseCard.style'
import { ICardData } from '@/app/showcase/panel/types'
import PostCard from './PostCard'
import ShareMenuItem from '@/components/dropdownMenu/ShareMenuItem'
import ReportMenuItem from '@/components/dropdownMenu/ReportMenuItem'

const ShowcaseCardBack = ({
  postId,
  sx,
  onClick,
  content,
  cardWidth,
  title,
  name,
  image,
  currentDomain,
}: {
  postId: number
  sx?: SxProps
  onClick?: (e: React.MouseEvent) => void
  flipped?: boolean
  title: string
  image: string | null
  name: string
  content: string
  cardWidth: number
  currentDomain: string
}) => {
  const router = useRouter()
  const { isPc } = useMedia()
  const currentPageUrl = window?.location.href

  const getLineCount = (originHeight: number, lineHeight: number) => {
    const lineCount = Math.floor((cardWidth * originHeight) / 328 / lineHeight)
    return lineCount ? lineCount : 1
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
                  url={currentPageUrl}
                  content={content}
                  message={currentPageUrl}
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
                  height: isPc ? '46px' : getLineCount(46, 22.5) * 22.5,
                  WebkitLineClamp: isPc
                    ? 2
                    : getLineCount(46, 22.5) /* 라인수 */,
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
            <Typography
              variant="Caption"
              color={'text.alternative'}
              // ref={containerRef}
              sx={{
                ...style.cardContentStyleBase,
                height: isPc ? '11.25rem' : getLineCount(180, 18) * 18,
                WebkitLineClamp: isPc ? 10 : getLineCount(180, 18) /* 라인수 */,
              }}
            >
              {content.split('\n').map((line) => {
                return (
                  <>
                    {line}
                    <br />
                  </>
                )
              })}
            </Typography>
          </CardContent>
          <CardContent sx={{ padding: 0 }} onClick={onClick}>
            <Stack direction={'row'} spacing={'0.5rem'}>
              <Avatar
                src={image ? image : '/icons/52.png'}
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
  sx,
}: {
  data: ICardData
  sx?: SxProps
  dragged: boolean
  setDragged: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [cardWidth, setCardWidth] = useState(0)
  const [currentDomain, setCurrentDomain] = useState('')
  const { isPc } = useMedia()

  useEffect(() => {
    // 현재 도메인 설정
    setCurrentDomain(window.location.origin)

    // 카드 너비 설정
    setCardWidth(
      isPc ? window.innerWidth * 0.9 : (window.innerHeight * 0.8 * 328) / 800,
    )
    const handleResize = () => {
      const newCardWidth = isPc
        ? window.innerWidth * 0.9
        : (window.innerHeight * 0.8 * 328) / 800
      setCardWidth(newCardWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
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
        authorImage={data.image}
        title={data.name}
        teamName={data.name}
        tagList={data.skill}
        image={data.image ? data.image : '/image/logo.png'}
        isFavorite={data.favorite}
        like={data.like}
        liked={data.liked}
        sx={{
          ...sx,
          backfaceVisibility: 'hidden',
          transform: 'translate(-50%, 0)',
          width: isPc ? '90%' : '90vw',
        }}
        onClick={handleMouseUp}
      />
      <ShowcaseCardBack
        postId={data.id}
        sx={sx}
        onClick={handleMouseUp}
        flipped={isFlipped}
        title={data.name}
        image={data.image}
        name={data.name}
        content={data.description}
        cardWidth={cardWidth}
        currentDomain={currentDomain}
      />
    </div>
  )
}

export { ShowcaseCard, ShowcaseCardBack }
