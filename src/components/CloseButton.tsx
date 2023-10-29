'use client'

import CloseIcon from '@mui/icons-material/Close'
import { Button, SxProps } from '@mui/material'

export default function CloseButton({
  style,
  action,
}: {
  style?: SxProps
  action?: () => void
}) {
  return (
    <>
      <Button
        onClick={action}
        sx={style ? style : { border: 'none', color: 'white' }}
      >
        <CloseIcon />
      </Button>
    </>
  )
}
