import { Stack, Typography } from '@mui/material'
import React from 'react'

const LabelWithIcon = ({
  svgIcon,
  message,
}: {
  svgIcon: React.ReactNode
  message: string
}) => {
  return (
    <Stack direction={'row'} spacing={'0.25rem'} alignItems={'center'}>
      {svgIcon}
      <Typography variant={'CaptionEmphasis'}>{message}</Typography>
    </Stack>
  )
}

export default LabelWithIcon
