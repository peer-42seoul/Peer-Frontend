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
  onClick,
  onChange,
  placeholder,
  buttonText,
  inValidInput,
  inputProps,
  type,
  isSubmitting,
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
                value: field.value || '',
                onChange: (e: any) => {
                  field.onChange(e)
                  if (onChange) {
                    onChange()
                  }
                },
              }}
              autoComplete="off"
              error={inValidInput}
              type={type}
              placeholder={placeholder}
              inputProps={inputProps}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {onClick && (
                      <SignUpFieldButton
                        name={name}
                        type={type}
                        onClick={onClick}
                        buttonText={buttonText}
                        isSubmitting={isSubmitting}
                      />
                    )}
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
