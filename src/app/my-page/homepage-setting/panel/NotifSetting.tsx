'use client'
import CuToggle from '@/components/CuToggle'
import {
  AlertColor,
  Box,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

interface IToastProps {
  severity: AlertColor | undefined
  message: string
}

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
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Typography variant="CaptionEmphasis" color={'text.strong'}>
          {type}
        </Typography>
        <FormControlLabel
          control={
            <CuToggle
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': `${type} 설정 토글` }}
            />
          }
          label={''}
          labelPlacement="start"
        />
      </Stack>
    </Box>
  )
}

const NotifSetting = ({
  setToastMessage,
}: {
  setToastMessage: (message: IToastProps) => void
}) => {
  const [keyword, setKeyword] = useState(false)
  const [team, setTeam] = useState(false)
  const [message, setMessage] = useState(false)
  const [night, setNight] = useState(false)

  console.log(setToastMessage)
  return (
    <Stack bgcolor={'background.secondary'} p={3} spacing={3}>
      <Stack spacing={2}>
        <Typography variant="Title3Emphasis">알림 설정</Typography>
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
    </Stack>
  )
}

export default NotifSetting
