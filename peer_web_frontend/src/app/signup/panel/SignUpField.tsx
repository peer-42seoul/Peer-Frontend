'use client'
import { Controller } from 'react-hook-form'
import { Typography, Button, TextField } from '@mui/material'
// import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'

import { ISignUpField } from '@/types/ISignUpInputs'

const SignUpField = ({
  label,
  name,
  control,
  error,
  rules,
  placeholder,
  onClick,
  buttonText,
  isInputValid,
  inputProps,
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
            <TextField
              {...field}
              type="text"
              disabled={isInputValid}
              placeholder={placeholder}
              inputProps={inputProps}
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
      {(error && <Typography>{error.message}</Typography>) || (
        <Typography>&nbsp;</Typography>
      )}
    </>
  )
}

export default SignUpField
