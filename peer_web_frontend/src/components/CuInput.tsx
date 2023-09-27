import { SxProps, TextField } from '@mui/material'
import React from 'react'

// react-hook-form을 사용하는 것을 가정하고 코드를 작성하였습니다.
// CuInput 사용 시 필수적으로 CuInputLabel을 사용해주세요.
const CuInput = ({
  id,
  field,
  variant,
  style,
}: {
  id: string
  field: any
  variant?: string
  style?: SxProps
}) => {
  return <TextField label="" variant={variant} id={id} {...field} sx={style} />
}

export default CuInput
