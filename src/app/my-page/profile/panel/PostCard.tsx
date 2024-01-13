import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  SxProps,
  Typography,
  alpha,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ITag } from '@/types/IPostDetail'
import { Chip } from '@mui/material'
import CuAvatar from '@/components/CuAvatar'
import * as style from './PostCard.style'
import { useRouter } from 'next/navigation'
import { EditIcon } from '@/icons'

interface IPostCard {
  teamLogo: string // 팀 로고
  teamName: string // 팀 이름
  postId: number // 글 id
  tagList: ITag[]
  image: string // 글 대표 이미지 (썸네일)
  sx?: SxProps // 카드 전체 스타일
}
function PostCard({
  teamLogo,
  teamName,
  tagList,
  image,
  sx,
  postId,
}: IPostCard) {
  const teamId: undefined | number = 1
  const showCaseId: undefined | number = undefined
  const peerLogId: undefined | number = undefined

  const router = useRouter()

  const gotoTeamPage = () => {
    router.push(`/teams/${teamId}`)
  }

  const goToRecruitPage = () => {
    router.push(`/recruit/${postId}`)
  }

  const gotoShowCasePage = () => {
    console.log('gotoShowCasePage')
    // router.push(`/showcase/${showCaseId}`)
  }

  const gotoPeerLogPage = () => {
    console.log('gotoPeerLogPage')
    // router.push(`/peer-log/${peerLogId}`)
  }

  const ref = React.useRef<HTMLDivElement>(null)
  const [currentCardWidth, setCurrentCardWidth] = useState<number>(0)

  useEffect(() => {
    if (ref.current) {
      setCurrentCardWidth(ref.current.clientWidth)
    }
  }, [ref, ref.current?.clientWidth])

  const getLineCount = (originHeight: number, lineHeight: number) => {
    const lineCount = Math.floor(
      (currentCardWidth || 328 * originHeight) / 328 / lineHeight,
    )
    return lineCount ? lineCount : 1
  }

  return (
    <Card
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        backfaceVisibility: 'hidden',
      }}
      ref={ref}
      onClick={gotoTeamPage}
    >
      <CardMedia
        component="img"
        image={image}
        alt="post thumbnail"
        sx={{
          ...style.cardMediaStyleBase,
          height: (currentCardWidth * 251) / 328,
        }}
      />
      <Stack
        sx={{
          p: '1rem',
          pt: '0.75rem',
          boxSizing: 'border-box',
        }}
        spacing={'15px'}
        maxHeight={'11.875rem'}
      >
        <CardHeader
          avatar={
            <CuAvatar
              aria-label="profile"
              src={teamLogo}
              sx={{
                ...style.cardAuthorAvatarStyleBase,
                height: (currentCardWidth * 32) / 328,
                width: (currentCardWidth * 32) / 328,
              }}
            />
          }
          title={
            <Typography variant="Body2" color="text.alternative">
              {teamName}
            </Typography>
          }
          sx={{ p: 0 }}
        />
        <CardContent sx={{ p: 0 }}>
          <Stack
            gap={1}
            direction={'row'}
            justifyContent={'center'}
            sx={{
              overflow: 'hidden',
              height: getLineCount(46, 22.5) * 20 + 8,
            }}
          >
            {tagList?.map(({ name, color }: ITag, idx: number) => {
              return (
                <Chip
                  label={
                    <Typography variant="Tag" color={color}>
                      {name}
                    </Typography>
                  }
                  size="small"
                  key={idx}
                  style={{
                    backgroundColor: alpha(color, 0.3),
                    borderRadius: 2,
                    height: '1.25rem',
                  }}
                />
              )
            })}
          </Stack>
        </CardContent>
        <CardContent sx={{ p: 0 }}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <IconButton disabled={!postId} onClick={goToRecruitPage}>
              <EditIcon sx={{ color: 'text.normal' }} />
            </IconButton>
            <IconButton disabled={!showCaseId} onClick={gotoShowCasePage}>
              <EditIcon
                sx={{ color: showCaseId ? 'text.normal' : 'text.disable' }}
              />
            </IconButton>
            <IconButton disabled={!peerLogId} onClick={gotoPeerLogPage}>
              <EditIcon
                sx={{ color: peerLogId ? 'text.normal' : 'text.disable' }}
              />
            </IconButton>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  )
}

export default PostCard
