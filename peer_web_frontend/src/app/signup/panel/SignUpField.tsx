'use client'
import { Controller } from 'react-hook-form'
import Typography from '@mui/material/Typography'

import { ISignUpField } from '@/types/ISignUpInputs'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import SignUpFieldButton from './SignUpFieldButton'
import { InputAdornment } from '@mui/material'

const SignUpField = ({
  label,
  name,
  control,
  error,
  rules,
  placeholder,
  onClick,
  onChange,
  buttonText,
  inValidInput,
  inputProps,
  type,
}: ISignUpField) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <CuTextFieldLabel htmlFor={name}>{label}</CuTextFieldLabel>
            <CuTextField
              field={{
                ...field,
                onChange: (e: any) => {
                  field.onChange(e)
                  if (onChange) {
                    onChange()
                  }
                },
              }}
              error={inValidInput}
              type={type}
              placeholder={placeholder}
              inputProps={inputProps}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SignUpFieldButton
                      name={name}
                      type={type}
                      onClick={onClick}
                      buttonText={buttonText}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
      />
      {(error && <Typography color="error">{error.message}</Typography>) || (
        <Typography>&nbsp;</Typography>
      )}
    </>
  )
}

export default SignUpField
