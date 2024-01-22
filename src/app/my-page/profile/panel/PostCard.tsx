'use client'
import {
  // Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  SxProps,
  Typography,
  alpha,
} from '@mui/material'
import React, { useState } from 'react'
import { ITag } from '@/types/IPostDetail'
import { Chip } from '@mui/material'
import CuAvatar from '@/components/CuAvatar'
import * as style from './PostCard.style'
import { useRouter } from 'next/navigation'
import SplitButton, { SplitButtonMenuItem } from '@/components/SplitButton'

interface IPostCard {
  teamLogo: string // 팀 로고
  teamName: string // 팀 이름
  postId: number // 글 id
  tagList: ITag[]
  image: string // 글 대표 이미지 (썸네일)
  sx?: SxProps // 카드 전체 스타일
  redirectionIds: Array<number | null> // 0이면 null로 처리한다, 이유는 공개 여부로 지정한다, [0] : recruitId, [1] : showcaseId, [2] : peerLogId
}

function PostCard({
  teamLogo,
  teamName,
  tagList,
  image,
  postId,
  redirectionIds,
}: IPostCard) {
  // 버튼
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const options = ['모집글', '쇼케이스', '피어로그']
  const [selectedOption, setSelectedOption] = useState<string>('')

  const gotoTeamPage = () => {
    router.push(`/teams/${postId}`)
  }

  const goToRecruitPage = () => {
    router.push(`/recruit/${redirectionIds[0]}`)
  }

  const gotoShowCasePage = () => {
    console.log('gotoShowCasePage')
    // router.push(`/showcase/${showCaseId}`)
  }

  const gotoPeerLogPage = () => {
    console.log('gotoPeerLogPage')
    // router.push(`/peer-log/${peerLogId}`)
  }

  const onClick = () => {
    if (selectedOption === '모집글') {
      goToRecruitPage()
    } else if (selectedOption === '쇼케이스') {
      gotoShowCasePage()
    } else if (selectedOption === '피어로그') {
      gotoPeerLogPage()
    }
  }

  return (
    <Card
      sx={{
        backgroundColor: 'background.primary',
        position: 'relative',
        '& .MuiCardContent-root:last-child ': {
          paddingBottom: '0',
        },
      }}
      onClick={gotoTeamPage}
    >
      <CardMedia
        component="img"
        image={image}
        alt="post thumbnail"
        sx={{
          ...style.cardMediaStyleBase,
          height: '10rem',
        }}
      />
      <Stack
        sx={{
          p: '1rem',
          pt: '0.75rem',
          boxSizing: 'border-box',
          minHeight: '12.5rem',
          position: 'relative',
        }}
        direction={'column'}
        justifyContent={'flex-start'}
        spacing={'1rem'}
      >
        <CardHeader
          avatar={
            <CuAvatar
              aria-label="profile"
              src={teamLogo}
              sx={style.cardAuthorAvatarStyleBase}
            />
          }
          title={
            <Typography variant="Body2" color="text.alternative">
              {teamName}
            </Typography>
          }
          sx={{ p: 0 }}
        />
        <CardContent sx={{ boxSizing: 'border-box', width: '100%', p: 0 }}>
          <Stack
            gap={1}
            direction={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            sx={{
              boxSizing: 'border-box',
              width: '100%',
              flexWrap: 'wrap',
              height: '3rem',
              overflow: 'hidden',
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
        <CardContent
          sx={{
            p: 0,
            pb: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SplitButton
            selectedOption={selectedOption}
            buttonText={
              selectedOption !== '' ? `${selectedOption} 보러가기` : '더보기'
            }
            onClick={onClick}
            open={open}
            setOpen={setOpen}
          >
            {redirectionIds.map((id, idx) => {
              return (
                <SplitButtonMenuItem
                  key={idx}
                  disabled={!id}
                  option={options[idx]}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  setOpen={setOpen}
                />
              )
            })}
          </SplitButton>
        </CardContent>
      </Stack>
    </Card>
  )
}

export default PostCard
