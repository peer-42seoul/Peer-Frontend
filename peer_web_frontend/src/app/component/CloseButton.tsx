'use client'

import CloseIcon from '@mui/icons-material/Close'
import { Button } from '@mui/material'

export default function CloseButton() {
  return (
    <>
      <Button style={{ border: 'none', color: 'white' }}>
        <CloseIcon />
      </Button>
    </>
  )
}
