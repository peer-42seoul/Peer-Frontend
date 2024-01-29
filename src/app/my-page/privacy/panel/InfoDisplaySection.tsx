import { Stack, Typography } from '@mui/material'
import React from 'react'

// TODO : 임시 이름. 나중에 변경
const InfoDisplaySection = ({
  infoTitle,
  info,
}: {
  infoTitle: string
  info: string
}) => {
  return (
    <Stack spacing={1}>
      <Typography variant="CaptionEmphasis" color="text.strong">
        {infoTitle}
      </Typography>
      <Typography variant="Body2" color="text.alternative">
        {info}
      </Typography>
    </Stack>
  )
}

export default InfoDisplaySection
