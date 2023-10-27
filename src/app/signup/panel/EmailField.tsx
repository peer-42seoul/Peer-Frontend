import { Dispatch, SetStateAction } from 'react'

import { InputAdornment, Button, Typography } from '@mui/material'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import { ControllerRenderProps, FieldError } from 'react-hook-form'

import { ISignUpInputs } from '@/types/ISignUpInputs'

const EmailField = ({
  field,
  emailSendStatus,
  setEmailSendStatus,
  submitEmail,
  isSubmitting,
  error,
}: {
  field: ControllerRenderProps<ISignUpInputs, 'email'>
  emailSendStatus: 'before' | 'submit' | 'error'
  setEmailSendStatus: Dispatch<SetStateAction<'before' | 'submit' | 'error'>>
  submitEmail: () => void
  isSubmitting: boolean
  error: FieldError | undefined
}) => {
  return (
    <>
      <CuTextFieldLabel htmlFor="email">이메일</CuTextFieldLabel>
      <CuTextField
        field={{
          ...field,
          onChange: (e: any) => {
            field.onChange(e)
            setEmailSendStatus('before')
          },
        }}
        autoComplete="off"
        error={emailSendStatus === 'error'}
        type="text"
        placeholder="이메일을 입력하세요"
        inputProps={{
          maxLength: 30,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                disabled={isSubmitting}
                onClick={submitEmail}
              >
                이메일 인증
              </Button>
            </InputAdornment>
          ),
        }}
      />
      {(error && <Typography color="error">{error.message}</Typography>) || (
        <Typography>&nbsp;</Typography>
      )}
    </>
  )
}

export default EmailField
