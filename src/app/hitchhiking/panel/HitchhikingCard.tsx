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
  CardActionArea,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Members from './Members'
import DropdownMenu from '@/components/DropdownMenu'
import useMedia from '@/hook/useMedia'
import * as style from './HitchhikingCard.style'
import ShareMenuItem from '@/components/dropdownMenu/ShareMenuItem'
import ReportMenuItem from '@/components/dropdownMenu/ReportMenuItem'
import useToast from '@/states/useToast'

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
  cardWidth,
  title,
  currentDomain,
}: {
  postId: number
  sx?: SxProps
  onClick?: (e: React.MouseEvent) => void
  flipped?: boolean
  isProject?: boolean
  title: string
  cardWidth: number
  currentDomain: string
}) => {
  const [data, setData] = useState<IHitchhikingCardBack | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const { openToast, closeToast } = useToast()

  const getLineCount = (
    otherOriginHeight: number,
    lineHeight: number,
    maxLine: number,
  ) => {
    const lineCount = Math.floor(
      ((cardWidth * 441) / 328 - (otherOriginHeight + 204)) / lineHeight,
    )
    if (lineCount > maxLine) return maxLine
    else if (lineCount < 1) return 1
    else return lineCount
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
    router.push(`/recruit/${postId}`)
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
      {data ? (
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
            alignItems={'center'}
            sx={style.cardHeaderStyleBase}
          >
            <CardContent sx={{ padding: 0 }} onClick={onClick}>
              <Chip
                label={
                  <Typography variant="Tag" color={'green.normal'}>
                    {isProject ? '프로젝트' : '스터디'}
                  </Typography>
                }
                sx={style.cardChipStyleBase}
              />
            </CardContent>
            {/* TODO : 작성자 id 가져오기 */}
            <CardActionArea sx={{ padding: 0, width: 'auto' }}>
              <DropdownMenu>
                <ShareMenuItem
                  url={`${currentDomain}/recruit/${postId}`}
                  title={title}
                  content="피어에서 동료를 구해보새요!"
                  message={`피어에서 동료를 구해보세요! 이런 프로젝트가 있어요! ${currentDomain}/recruit/${postId}`}
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
                  WebkitLineClamp: getLineCount(191, 22.5, 2) /* 라인수 */,
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
            <Typography
              variant="Caption"
              color={'text.alternative'}
              sx={{
                ...style.cardContentStyleBase,
                WebkitLineClamp: getLineCount(46, 18, 10) /* 라인수 */,
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
  const [cardWidth, setCardWidth] = useState(0)
  const [currentDomain, setCurrentDomain] = useState('')
  const { isPc } = useMedia()

  useEffect(() => {
    // 현재 도메인 설정
    setCurrentDomain(window.location.origin)

    // 카드 너비 설정
    setCardWidth(
      isPc ? (window.innerHeight * 0.8 * 328) / 800 : window.innerWidth * 0.9,
    )
    const handleResize = () => {
      const newCardWidth = isPc
        ? (window.innerHeight * 0.8 * 328) / 800
        : window.innerWidth * 0.9
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
        postId={postId}
        sx={style.cardStyleBase}
        onClick={handleMouseUp}
        flipped={isFlipped}
        isProject={isProject}
        title={title}
        cardWidth={cardWidth}
        currentDomain={currentDomain}
      />
    </div>
  )
}

export default HitchhikingCard
