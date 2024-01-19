'use client'
import CuToggle from '@/components/CuToggle'
import TitleBox from '@/components/TitleBox'
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
          <Typography
            variant="CaptionEmphasis"
            color={'text.strong'}
            sx={{ marginRight: '16px', marginLeft: '0' }}
          >
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

  return (
    <TitleBox title="알림 설정">
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
