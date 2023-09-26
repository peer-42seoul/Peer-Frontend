'use client'

import React from 'react'
import { Card, SxProps } from '@mui/material'
import { ReactNode } from 'react'

interface CuCardProps {
  style: SxProps
  children: ReactNode
}

const CuCard = ({ style, children }: CuCardProps) => {
  return <Card sx={style}>{children}</Card>
}

export default CuCard
