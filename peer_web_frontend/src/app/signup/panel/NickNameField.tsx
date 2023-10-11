import { Control, FieldError } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'

import { ISignUpField, ISignUpInputs } from '@/types/ISignUpInputs'
import SignUpField from './SignUpField'

const NickNameField = ({
  control,
  error,
  setIsNickNameSent,
  submitNickName,
  isNickNameSent,
  nickNameError,
}: {
  control: Control<ISignUpInputs, any>
  error?: FieldError
  setIsNickNameSent: Dispatch<SetStateAction<boolean>>
  submitNickName: () => void
  isNickNameSent: boolean
  nickNameError: boolean
}) => {
  const nickName: ISignUpField = {
    label: '닉네임',
    name: 'nickName',
    control: control,
    error: error,
    rules: {
      required: '닉네임을 입력하세요',
      minLength: {
        value: 2,
        message: '닉네임은 2자 이상이어야 합니다',
      },
      maxLength: {
        value: 7,
        message: '닉네임은 7자 이하여야 합니다',
      },
    },
    placeholder: '닉네임을 입력하세요',
    onClick: submitNickName,
    onChange: () => {
      setIsNickNameSent(false)
    },
    buttonText: '중복 확인',
    inValidInput: isNickNameSent && nickNameError,
    inputProps: {
      minLength: 2,
      maxLength: 7,
    },
    type: 'text',
  }

  return <SignUpField {...nickName} />
}

export default NickNameField
