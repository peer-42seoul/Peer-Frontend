import { InputAdornment, Button } from '@mui/material'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import { ControllerRenderProps } from 'react-hook-form'
import { ISignUpInputs } from '@/types/ISignUpInputs'

const CodeField = ({
  field,
  codeSendStatus,
  submitCode,
  isSubmitting,
}: {
  field: ControllerRenderProps<ISignUpInputs, 'code'>
  codeSendStatus: 'before' | 'submit' | 'error'
  submitCode: () => void
  isSubmitting: boolean
}) => {
  return (
    <>
      <CuTextFieldLabel htmlFor="code">인증번호</CuTextFieldLabel>
      <CuTextField
        field={field}
        disabled={codeSendStatus === 'submit'}
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
                disabled={isSubmitting || codeSendStatus === 'submit'}
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
