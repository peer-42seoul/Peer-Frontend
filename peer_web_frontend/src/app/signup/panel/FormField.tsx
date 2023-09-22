'use client'
import { Controller } from 'react-hook-form'
import { InputLabel, TextField, Typography, Button } from '@mui/material'

interface IFormField {
  label: string
  name: string
  control: any
  error: any
  rules: any
  onClick?: () => void
  buttonText?: string
}

const FormField = ({
  label,
  name,
  control,
  error,
  rules,
  onClick,
  buttonText,
}: IFormField) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <InputLabel>{label}</InputLabel>
            <TextField {...field} type="text" autoFocus />
            {onClick && (
              <Button
                sx={{ margin: '10px' }}
                variant="contained"
                onClick={onClick}
              >{`${buttonText}`}</Button>
            )}
          </>
        )}
      />
      {error && <Typography>{error.message}</Typography>}
    </>
  )
}

export default FormField
