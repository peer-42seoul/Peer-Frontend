import { InputLabel, SxProps } from '@mui/material'
import React from 'react'

const CuInputLabel = ({
  labelString,
  htmlFor,
  style,
}: {
  labelString: string
  htmlFor: string
  style?: SxProps
}) => {
  return (
    <InputLabel sx={style} htmlFor={htmlFor}>
      {labelString}
    </InputLabel>
  )
}

export default CuInputLabel
