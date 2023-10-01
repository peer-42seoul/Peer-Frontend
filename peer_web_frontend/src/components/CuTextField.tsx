import { SxProps, TextField } from '@mui/material'
import React from 'react'

// react-hook-form을 사용하는 것을 가정하고 코드를 작성하였습니다.
// label prop을 제공하지 않을 시 필수적으로 CuTextFieldLabel을 사용하고 id를 제공해주세요
const CuTextField = ({
  field,
  id,
  variant,
  style,
  label,
}: {
  field?: any
  id?: string
  variant?: string
  style?: SxProps
  label?: string
}) => {
  return (
    <TextField label={label} variant={variant} id={id} {...field} sx={style} />
  )
}

export default CuTextField
