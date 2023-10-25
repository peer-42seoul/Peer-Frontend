import { Dispatch, SetStateAction } from 'react'

import CuTextField from '@/components/CuTextField'
import { InputAdornment } from '@mui/material'
import { Button } from '@mui/material'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'

const EmailField = ({
  field,
  emailSendStatus,
  setEmailSendStatus,
  submitEmail,
  isSubmitting,
}: {
  field: any
  emailSendStatus: 'before' | 'submit' | 'error'
  setEmailSendStatus: Dispatch<SetStateAction<'before' | 'submit' | 'error'>>
  submitEmail: () => void
  isSubmitting: boolean
}) => {
  return (
    <>
      <CuTextFieldLabel htmlFor="이메일">이메일</CuTextFieldLabel>
      <CuTextField
        field={{
          ...field,
          onChange: (e: any) => {
            field.onChange(e)
            setEmailSendStatus('before')
          },
        }}
        defaultValue=""
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
    </>
  )
}

export default EmailField
