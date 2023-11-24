import { InputAdornment, Button, Typography } from '@mui/material'
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
      <CuTextFieldLabel htmlFor="code">
        <Typography variant="Caption">인증코드</Typography>
      </CuTextFieldLabel>
      <CuTextField
        {...field}
        disabled={codeSendStatus === 'submit'}
        autoComplete="off"
        error={codeSendStatus === 'error'}
        type="text"
        placeholder="인증코드를 입력하세요"
        inputProps={{
          maxLength: 10,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="text"
                disabled={isSubmitting || codeSendStatus === 'submit'}
                onClick={submitCode}
              >
                <Typography variant="CaptionEmphasis">인증하기</Typography>
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </>
  )
}

export default CodeField
