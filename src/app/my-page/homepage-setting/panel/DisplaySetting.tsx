'use client'
import CuToggle from '@/components/CuToggle'
import { FormControlLabel, Stack, Typography } from '@mui/material'
import { useState } from 'react'

const DisplaySetting = () => {
  const [useSystem, setUseSystem] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Stack bgcolor={'background.secondary'} p={3} spacing={3}>
      <Typography variant="Title3Emphasis" color={'text.normal'}>
        화면 스타일
      </Typography>
      <Stack direction={'row'} spacing={2}>
        <FormControlLabel
          control={
            <CuToggle
              checked={useSystem}
              onChange={() => {
                setUseSystem((prev) => !prev)
              }}
              inputProps={{ 'aria-label': `시스템 설정 토글` }}
            />
          }
          label={
            <Typography
              variant="CaptionEmphasis"
              color={'text.strong'}
              sx={{ marginRight: '16px', marginLeft: '0' }}
            >
              시스템 설정
            </Typography>
          }
          labelPlacement="start"
        />
        <FormControlLabel
          sx={{ opacity: useSystem ? 0 : 1, transition: 'opacity 0.3s ease' }}
          control={
            <CuToggle
              checked={darkMode}
              onChange={() => {
                setDarkMode((prev) => !prev)
              }}
              inputProps={{ 'aria-label': `라이트/다크모드 토글` }}
              uncheckedTrackImage="/images/sign_moon.svg"
              checkedTrackImage="/images/sign_sun.svg"
            />
          }
          label={
            <Typography
              variant="CaptionEmphasis"
              color={'text.strong'}
              sx={{ marginRight: '16px', marginLeft: '0' }}
            >
              라이트 / 다크 모드
            </Typography>
          }
          labelPlacement="start"
        />
      </Stack>
    </Stack>
  )
}

export default DisplaySetting
