import { SxProps, TextField } from '@mui/material'
import React from 'react'

// react-hook-form을 사용하는 것을 가정하고 코드를 작성하였습니다.
// label prop을 제공하지 않을 시 필수적으로 CuTextFieldLabel을 사용하고 id를 제공해주세요
// mui와 관련된 prop을 넣을 수 있도록 mui prop을 추가하였습니다.
const CuTextField = ({
  id,
  field,
  variant,
  style,
  label,
  muiProps,
  autoComplete,
}: {
  id?: string
  field?: any
  variant?: string
  style?: SxProps
  label?: string
  muiProps?: any
  autoComplete?: string
}) => {
  return (
    <TextField
      label={label}
      variant={variant}
      id={id}
      {...field}
      {...muiProps}
      sx={style}
      autoComplete={autoComplete}
    />
  )
}

export default CuTextField
