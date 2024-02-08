'use client'
import { BetaBadge } from '@/components/BetaBadge'
import CuToggle from '@/components/CuToggle'
import TitleBox from '@/components/TitleBox'
import useMedia from '@/hook/useMedia'
import { Box, FormControlLabel, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

const Notif = ({
  checked,
  handleChange,
  type,
}: {
  checked: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type: string
}) => {
  return (
    <Box>
      <FormControlLabel
        sx={{ marginLeft: '0', display: 'box' }}
        control={
          <CuToggle
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': `${type} 설정 토글` }}
          />
        }
        label={
          <Typography variant="CaptionEmphasis" color={'text.strong'}>
            {type}
          </Typography>
        }
        labelPlacement="start"
      />
    </Box>
  )
}

const NotifSetting = () => {
  const [keyword, setKeyword] = useState(false)
  const [team, setTeam] = useState(false)
  const [message, setMessage] = useState(false)
  const [night, setNight] = useState(false)

  const { isPc } = useMedia()

  return (
    <TitleBox
      title="알림 설정"
      titleComponent={
        <Stack direction="row" alignItems={'center'} height={'2.5rem'}>
          <Stack
            direction="row"
            spacing={1}
            alignItems={'baseline'}
            height={'fit-content'}
          >
            <Typography
              variant={isPc ? 'Title3Emphasis' : 'Body1Emphasis'}
              component={'h3'}
            >
              알림 설정
            </Typography>
            <BetaBadge sx={{ height: '0.75rem' }} />
            <Typography variant="Caption" color={'text.assistive'}>
              아직 개발 중인 기능입니다.
            </Typography>
          </Stack>
        </Stack>
      }
    >
      <Stack spacing={2}>
        <Notif
          type="키워드 알림"
          checked={keyword}
          handleChange={() => setKeyword((prev) => !prev)}
        />
        <Notif
          type="프로젝트/스터디 알림"
          checked={team}
          handleChange={() => setTeam((prev) => !prev)}
        />
        <Notif
          type="쪽지 알림"
          checked={message}
          handleChange={() => setMessage((prev) => !prev)}
        />
        <Notif
          type="야간 알림(20시~9시)"
          checked={night}
          handleChange={() => setNight((prev) => !prev)}
        />
      </Stack>
    </TitleBox>
  )
}

export default NotifSetting
