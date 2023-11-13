import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'

// label prop을 제공하지 않을 시 필수적으로 CuTextFieldLabel을 사용하고 id를 제공해주세요

const CuTextField = (props: TextFieldProps) => {
  return <TextField {...props} />
}

export default CuTextField
