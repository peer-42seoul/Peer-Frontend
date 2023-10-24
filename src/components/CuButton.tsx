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
  startIcon?: React.JSX.Element // 버튼 텍스트 앞에 들어갈 아이콘
  endIcon?: React.JSX.Element // 버튼 텍스트 뒤에 들어갈 아이콘
  fullWidth?: boolean // width: 100%
  disabled?: boolean // 비활성화
}

const CuButton = ({
  style,
  message,
  action,
  variant,
  type,
  startIcon,
  endIcon,
  fullWidth,
  disabled,
}: CuButtonProps) => {
  return (
    <Button
      onClick={action}
      sx={style}
      variant={variant}
      type={type}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {message}
    </Button>
  )
}

export default CuButton
