'use client'

import { TextField } from '@mui/material'
import { SxProps } from '@mui/system'

interface CuInputProps {
  style: SxProps //나중에 들어갈 스타일
  label: string //텍스트 필드의 라벨
  action: () => void //텍스트 필드의 입력값을 받아올 함수
}

const CuInput = ({ style, label, action }: CuInputProps) => {
  return <TextField onChange={action} sx={style} label={label} />
}

export default CuInput
