'use client'

import React from 'react'
import { Button } from '@mui/material'
import { SxProps } from '@mui/system'

interface CuButtonProps {
  style?: SxProps //나중에 들어갈 스타일
  message: string //버튼에 들어갈 메시지
  action: () => void //버튼을 눌렀을 때 실행할 함수
  variant: 'text' | 'outlined' | 'contained' //버튼의 종류
  type?: 'button' | 'submit' | 'reset' | undefined //버튼의 타입
}

const CuButton = ({ style, message, action, variant, type }: CuButtonProps) => {
  return (
    <Button onClick={action} sx={style} variant={variant} type={type}>
      {message}
    </Button>
  )
}

export default CuButton
