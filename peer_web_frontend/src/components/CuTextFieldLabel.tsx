import { InputLabel, SxProps } from '@mui/material'
import React from 'react'

const CuTextFieldLabel = ({
  children,
  htmlFor,
  style,
}: {
  children: React.ReactNode
  htmlFor: string
  style?: SxProps
}) => {
  return (
    <InputLabel sx={style} htmlFor={htmlFor}>
      {children}
    </InputLabel>
  )
}

export default CuTextFieldLabel
