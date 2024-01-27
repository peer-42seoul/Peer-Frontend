import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import * as style from './privacy-setting.style'

const AuthSettingSection = ({
  authorized = false,
  authenticationTitle,
  authenticatedContent,
  href,
}: {
  authorized: boolean
  authenticationTitle: string
  authenticatedContent: string
  href: string
}) => {
  return (
    <Stack spacing={2} direction="row" alignItems={'center'}>
      <Typography variant="CaptionEmphasis" color="text.strong">
        {authenticationTitle}
      </Typography>
      {authorized ? (
        <Typography variant="Body2" color="text.alternative">
          {authenticatedContent}
        </Typography>
      ) : (
        <Button variant="contained" href={href} sx={style.buttonStyleBase}>
          <Typography variant="CaptionEmphasis" color="text.strong">
            인증하기
          </Typography>
        </Button>
      )}
    </Stack>
  )
}

export default AuthSettingSection
