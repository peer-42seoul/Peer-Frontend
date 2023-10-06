'use client'
import { Controller } from 'react-hook-form'
import Typography from '@mui/material/Typography'

import { ISignUpField } from '@/types/ISignUpInputs'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import SignUpFieldButton from './SignUpFieldButton'
import { InputAdornment, TextField } from '@mui/material'

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
            <TextField
              {...field}
              type={type}
              disabled={isInputValid}
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
                      isInputValid={isInputValid}
                    />
                  </InputAdornment>
                ),
              }}
            />
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
