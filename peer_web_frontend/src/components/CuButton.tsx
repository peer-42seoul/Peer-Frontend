'use client'

import React from 'react'
import { Button } from '@mui/material'
import { SxProps } from '@mui/system'

interface CuButtonProps {
  style: SxProps //나중에 들어갈 스타일
  message: string //버튼에 들어갈 메시지
  action: () => void //버튼을 눌렀을 때 실행할 함수
  varient: 'text' | 'outlined' | 'contained' //버튼의 종류
}

const CuButton = ({ style, message, action, varient }: CuButtonProps) => {
  return (
    <Button onClick={action} sx={style} variant={varient}>
      {message}
    </Button>
  )
}

export default CuButton
