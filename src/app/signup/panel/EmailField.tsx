import { InputAdornment, Button, Typography } from '@mui/material'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import { ControllerRenderProps, FieldError } from 'react-hook-form'

import { ISignUpInputs } from '@/types/ISignUpInputs'

const EmailField = ({
  field,
  emailSendStatus,
  submitEmail,
  isSubmitting,
  error,
}: {
  field: ControllerRenderProps<ISignUpInputs, 'email'>
  emailSendStatus: 'before' | 'submit' | 'error'
  submitEmail: () => void
  isSubmitting: boolean
  error: FieldError | undefined
}) => {
  return (
    <>
      <CuTextFieldLabel htmlFor="email">
        <Typography variant="Caption">새로운 이메일</Typography>
      </CuTextFieldLabel>
      <CuTextField
        {...field}
        disabled={emailSendStatus === 'submit'}
        autoComplete="email"
        error={emailSendStatus === 'error'}
        type="text"
        placeholder="가입할 이메일을 입력하세요."
        inputProps={{
          maxLength: 30,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="text"
                disabled={isSubmitting || emailSendStatus === 'submit'}
                onClick={submitEmail}
              >
                <Typography variant="CaptionEmphasis">코드 전송</Typography>
              </Button>
            </InputAdornment>
          ),
        }}
      />
      <Typography color="error" variant="Caption">
        {error?.message || '\u00A0'}
      </Typography>
    </>
  )
}

export default EmailField
