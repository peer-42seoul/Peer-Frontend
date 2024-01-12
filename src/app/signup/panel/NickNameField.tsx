import { Dispatch, SetStateAction } from 'react'

import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import { Button, InputAdornment, Typography } from '@mui/material'

import { ControllerRenderProps, FieldError } from 'react-hook-form'
import { ISignUpInputs } from '@/types/ISignUpInputs'

const NickNameField = ({
  field,
  nickNameSendStatus,
  setNickNameSendStatus,
  submitNickName,
  isSubmitting,
  error,
}: {
  field: ControllerRenderProps<ISignUpInputs, 'nickName'>
  nickNameSendStatus: 'before' | 'submit' | 'error'
  setNickNameSendStatus: Dispatch<SetStateAction<'before' | 'submit' | 'error'>>
  submitNickName: () => void
  isSubmitting: boolean
  error: FieldError | undefined
}) => {
  return (
    <>
      <CuTextFieldLabel htmlFor="nickName">닉네임</CuTextFieldLabel>
      <CuTextField
        {...field}
        onChange={(e) => {
          field.onChange(e)
          setNickNameSendStatus('before')
        }}
        autoComplete="nickname"
        error={nickNameSendStatus === 'error'}
        type="text"
        placeholder="닉네임을 입력하세요."
        inputProps={{
          minLength: 2,
          maxLength: 7,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="text"
                disabled={isSubmitting}
                onClick={submitNickName}
              >
                <Typography variant="CaptionEmphasis">중복 확인</Typography>
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

export default NickNameField
