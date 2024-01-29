import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import * as style from './privacy-setting.style'
import InfoDisplaySection from './InfoDisplaySection'

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
    <>
      {authorized ? (
        <InfoDisplaySection
          infoTitle={authenticationTitle}
          info={authenticatedContent}
        />
      ) : (
        <Stack spacing={2} direction="row" alignItems={'center'}>
          <Typography variant="CaptionEmphasis" color="text.strong">
            {authenticationTitle}
          </Typography>
          <Button variant="contained" href={href} sx={style.buttonStyleBase}>
            <Typography variant="CaptionEmphasis" color="text.strong">
              인증하기
            </Typography>
          </Button>
          <Typography variant="Tag" color="yellow.strong">
            인증하기를 눌러 인증해주세요!
          </Typography>
        </Stack>
      )}
    </>
  )
}

export default AuthSettingSection
