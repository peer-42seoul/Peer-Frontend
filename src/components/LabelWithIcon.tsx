import { Stack, Typography } from '@mui/material'
import React from 'react'

const LabelWithIcon = ({
  svgIcon,
  message,
  color,
}: {
  svgIcon: React.ReactNode
  message: string
  color?: string
}) => {
  return (
    <Stack
      direction={'row'}
      spacing={'0.25rem'}
      alignItems={'center'}
      sx={{ width: '100%', height: '1.5rem' }}
    >
      {svgIcon}
      <Typography variant={'CaptionEmphasis'} color={color}>
        {message}
      </Typography>
    </Stack>
  )
}

export default LabelWithIcon
