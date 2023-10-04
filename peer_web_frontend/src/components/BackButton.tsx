'use client'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  return (
    <Button
      style={{ border: 'none', color: 'white' }}
      onClick={() => router.back()}
    >
      <ArrowBackIosNewIcon />
    </Button>
  )
}
