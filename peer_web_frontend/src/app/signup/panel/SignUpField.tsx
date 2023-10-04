'use client'
import { Controller, Control, FieldError } from 'react-hook-form'
import { Typography, Button } from '@mui/material'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'

import { ISignUpInputs } from '@/types/ISignUpInputs'

interface ISignUpFieldRules {
  required: string
  pattern?: {
    value: RegExp
    message: string
  }
  minLength?: {
    value: number
    message: string
  }
  maxLength?: {
    value: number
    message: string
  }
  validate?: (value: string) => boolean | string
}

interface ISignUpField {
  label: string
  name: string
  control: Control<ISignUpInputs, any>
  error: FieldError
  rules: ISignUpFieldRules
  placeholder?: string
  onClick?: () => void
  buttonText?: string
  isInputValid?: boolean
  inputProps?: any
}

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
            <CuTextField
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
