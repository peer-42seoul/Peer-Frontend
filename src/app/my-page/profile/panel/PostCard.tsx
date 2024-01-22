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
}

// const RoutingButton = ({
//   onClick,
//   disabled,
//   buttonText,
// }: {
//   onClick: () => void
//   disabled: boolean
//   buttonText: string
// }) => {
//   const handleClick = (e: React.MouseEvent) => {
//     e.stopPropagation()
//     onClick()
//   }
//   return (
//     <Button
//       disabled={disabled}
//       onClick={handleClick}
//       variant="contained"
//       sx={{ width: '4.75rem', height: '2rem' }}
//     >
//       <Typography
//         variant="Caption"
//         color={disabled ? 'text.assistive' : 'text.normal'}
//       >
//         {buttonText}
//       </Typography>
//     </Button>
//   )
// }

function PostCard({ teamLogo, teamName, tagList, image, postId }: IPostCard) {
  const teamId: undefined | number = 1
  const showCaseId: undefined | number = undefined
  const peerLogId: undefined | number = undefined

  // 버튼
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const options = ['모집글', '쇼케이스', '피어로그']
  const [selectedOption, setSelectedOption] = useState('')

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
        justifyContent={'space-between'}
        spacing={'15px'}
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
          }}
        >
          <SplitButton
            selectedOption={selectedOption}
            buttonText={`${selectedOption} 보러가기`}
            onClick={onClick}
            open={open}
            setOpen={setOpen}
          >
            <SplitButtonMenuItem
              disabled={!postId}
              option={options[0]}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              setOpen={setOpen}
            />
            <SplitButtonMenuItem
              disabled={!showCaseId}
              option={options[1]}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              setOpen={setOpen}
            />
            <SplitButtonMenuItem
              disabled={!peerLogId}
              option={options[2]}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              setOpen={setOpen}
            />
          </SplitButton>
          {/* <Stack
            direction={'row'}
            justifyContent={'center'}
            flexWrap={'wrap'}
            gap={'0.5rem'}
            sx={{ boxSizing: 'border-box', width: '100%' }}
          >
            <RoutingButton
              onClick={goToRecruitPage}
              buttonText={'모집글'}
              disabled={!postId}
            />
            <RoutingButton
              onClick={gotoShowCasePage}
              buttonText={'쇼케이스'}
              disabled={!showCaseId}
            />
            <RoutingButton
              onClick={gotoPeerLogPage}
              buttonText={'피어로그'}
              disabled={!peerLogId}
            />
          </Stack> */}
        </CardContent>
      </Stack>
    </Card>
  )
}

export default PostCard
