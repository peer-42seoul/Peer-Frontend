'use client'

import React from 'react'
import { Button, Typography, TypographyProps } from '@mui/material'
import { SxProps } from '@mui/system'

interface CuButtonProps {
  style?: SxProps //나중에 들어갈 스타일
  message: string //버튼에 들어갈 메시지
  action?: () => void //버튼을 눌렀을 때 실행할 함수
  variant?: 'text' | 'outlined' | 'contained' //버튼의 종류
  type?: 'button' | 'submit' | 'reset' | undefined //버튼의 타입
  startIcon?: React.JSX.Element // 버튼 텍스트 앞에 들어갈 아이콘
  endIcon?: React.JSX.Element // 버튼 텍스트 뒤에 들어갈 아이콘
  fullWidth?: boolean // width: 100%
  disabled?: boolean // 비활성화
  TypographyProps?: TypographyProps // 버튼 텍스트에 들어갈 스타일
  form?: string // 버튼이 속한 폼의 id
}

const CuButton = ({
  style,
  message,
  action,
  variant = 'contained',
  type,
  startIcon,
  endIcon,
  fullWidth,
  disabled,
  TypographyProps,
  form,
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
      form={form}
    >
      <Typography {...TypographyProps}>{message}</Typography>
    </Button>
  )
}

export default CuButton
