import { Button, Typography } from '@mui/material'
import React from 'react'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'
const ApplyDefaultButton = ({
  handleApply,
  disabled,
  sx,
}: {
  handleApply: (role: string | null) => void
  disabled: boolean
  sx?: SxProps<Theme>
}) => {
  return (
    <Button
      id="apply-button"
      variant="contained"
      size="large"
      onClick={() => handleApply(null)}
      sx={sx}
      disabled={disabled}
    >
      <Typography variant={'Body1'} color={'white'}>
        {disabled ? '마감' : '지원하기'}
      </Typography>
    </Button>
  )
}

export default ApplyDefaultButton
