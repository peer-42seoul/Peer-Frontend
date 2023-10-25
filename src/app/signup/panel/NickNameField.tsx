import { Dispatch, SetStateAction } from 'react'

import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import { Button, InputAdornment } from '@mui/material'

const NickNameField = ({
  field,
  nickNameSendStatus,
  setNickNameSendStatus,
  submitNickName,
  isSubmitting,
}: {
  field: any
  nickNameSendStatus: 'before' | 'submit' | 'error'
  setNickNameSendStatus: Dispatch<SetStateAction<'before' | 'submit' | 'error'>>
  submitNickName: () => void
  isSubmitting: boolean
}) => {
  return (
    <>
      <CuTextFieldLabel htmlFor="nickname">닉네임</CuTextFieldLabel>
      <CuTextField
        field={{
          ...field,
          onChange: (e: any) => {
            field.onChange(e)
            setNickNameSendStatus('before')
          },
        }}
        autoComplete="off"
        error={nickNameSendStatus === 'error'}
        type="text"
        placeholder="닉네임을 입력하세요"
        inputProps={{
          minLength: 2,
          maxLength: 7,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                disabled={isSubmitting}
                onClick={submitNickName}
              >
                중복 확인
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </>
  )
}

export default NickNameField
