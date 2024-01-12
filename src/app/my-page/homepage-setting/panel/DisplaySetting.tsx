'use client'
import CuToggle from '@/components/CuToggle'
import { FormControlLabel, Stack, Typography } from '@mui/material'
import { useDarkMode } from '@/states/useDarkMode'
import TitleBox from '@/components/TitleBox'

const DisplaySetting = () => {
  const { useSystemTheme, isLightMode, toggleDarkMode, toggleSystemTheme } =
    useDarkMode()

  return (
    <TitleBox title="화면 설정">
      <Stack direction={'row'} spacing={2}>
        <FormControlLabel
          control={
            <CuToggle
              checked={useSystemTheme}
              onChange={toggleSystemTheme}
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
          sx={{
            opacity: useSystemTheme ? 0 : 1,
            transition: 'opacity 0.5s ease',
          }}
          control={
            <CuToggle
              checked={isLightMode()}
              onChange={toggleDarkMode}
              inputProps={{ 'aria-label': `라이트/다크모드 토글` }}
              uncheckedtrackimage="/images/sign_moon.svg"
              checkedtrackimage="/images/sign_sun.svg"
            />
          }
          label={
            <Typography
              variant="CaptionEmphasis"
              color={'text.alternative'}
              sx={{
                marginRight: '16px',
                marginLeft: '0',
                // textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              라이트/ 다크 모드
            </Typography>
          }
          labelPlacement="start"
        />
      </Stack>
    </TitleBox>
  )
}

export default DisplaySetting
