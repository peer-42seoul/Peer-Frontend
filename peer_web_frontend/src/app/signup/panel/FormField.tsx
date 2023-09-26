'use client'
import { Controller } from 'react-hook-form'
import { InputLabel, TextField, Typography, Button } from '@mui/material'

interface IFormField {
  label: string
  name: string
  control: any
  error: any
  rules: any
  placeholder?: string
  onClick?: () => void
  buttonText?: string
  isInputValid?: boolean
}

const FormField = ({
  label,
  name,
  control,
  error,
  rules,
  placeholder,
  onClick,
  buttonText,
  isInputValid,
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
            <TextField
              {...field}
              type="text"
              autoFocus
              disabled={isInputValid}
              placeholder={placeholder}
            />
            {onClick && (
              <Button
                variant="contained"
                disabled={isInputValid}
                onClick={onClick}
              >
                {buttonText}
              </Button>
            )}
          </>
        )}
      />
      {error && <Typography>{error.message}</Typography>}
    </>
  )
}

export default FormField
