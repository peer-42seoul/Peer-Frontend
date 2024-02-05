import React, { ReactNode } from 'react'
import TextField from '@mui/material/TextField'

interface ICuSelectProps {
  value: any
  setValue: (value: any) => void
  children?: ReactNode
}

const CuSelect = ({ children, setValue, value }: ICuSelectProps) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setValue(event.target?.value)
  }

  return (
    <>
      <TextField
        select
        size="small"
        value={value}
        onChange={(e) => handleChange(e)}
        sx={{ my: 1, minWidth: 120, padding: 0 }}
      >
        {children}
      </TextField>
    </>
  )
}

export default CuSelect
