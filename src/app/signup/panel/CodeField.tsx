import { Dispatch, SetStateAction } from 'react'

import { InputAdornment } from '@mui/material'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import { Button } from '@mui/material'

const CodeField = ({
  field,
  codeSendStatus,
  setCodeSendStatus,
  submitCode,
  isSubmitting,
}: {
  field: any
  codeSendStatus: 'before' | 'submit' | 'error'
  setCodeSendStatus: Dispatch<SetStateAction<'before' | 'submit' | 'error'>>
  submitCode: () => void
  isSubmitting: boolean
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
    </>
  )
}

export default CodeField
