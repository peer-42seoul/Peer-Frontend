import React from 'react'
import NotifSetting from './panel/NotifSetting'
import DisplaySetting from './panel/DisplaySetting'
import KeywordSetting from './panel/KeywordSetting'
import { Stack } from '@mui/material'

const HomepageSetting = () => {
  return (
    <Stack
      sx={{ whiteSpace: 'pre-line', wordBreak: 'keep-all' }}
      spacing={['1.5rem', '2rem']}
    >
      <NotifSetting />
      <KeywordSetting />
      <DisplaySetting />
    </Stack>
  )
}

export default HomepageSetting
