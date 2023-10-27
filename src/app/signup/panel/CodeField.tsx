import { Dispatch, SetStateAction } from 'react'

import { InputAdornment, Button, Typography } from '@mui/material'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import { ControllerRenderProps, FieldError } from 'react-hook-form'
import { ISignUpInputs } from '@/types/ISignUpInputs'

const CodeField = ({
  field,
  codeSendStatus,
  setCodeSendStatus,
  submitCode,
  isSubmitting,
  error,
}: {
  field: ControllerRenderProps<ISignUpInputs, 'code'>
  codeSendStatus: 'before' | 'submit' | 'error'
  setCodeSendStatus: Dispatch<SetStateAction<'before' | 'submit' | 'error'>>
  submitCode: () => void
  isSubmitting: boolean
  error: FieldError | undefined
}) => {
  return (
    <>
      <CuTextFieldLabel htmlFor="code">인증번호</CuTextFieldLabel>
      <CuTextField
        field={{
          ...field,
          onChange: (e: any) => {
            field.onChange(e)
            setCodeSendStatus('before')
          },
        }}
        autoComplete="off"
        error={codeSendStatus === 'error'}
        type="text"
        placeholder="인증번호를 입력하세요"
        inputProps={{
          maxLength: 6,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                disabled={isSubmitting}
                onClick={submitCode}
              >
                인증번호 확인
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

export default CodeField
