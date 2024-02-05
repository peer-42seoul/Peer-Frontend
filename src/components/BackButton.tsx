'use client'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Button, SxProps } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function BackButton({
  action,
  style,
}: {
  action?: () => void
  style?: SxProps
}) {
  const router = useRouter()
  return (
    <Button
      sx={style ? style : { border: 'none', color: 'white' }}
      onClick={action ? action : () => router.back()}
    >
      <ArrowBackIosNewIcon />
    </Button>
  )
}
