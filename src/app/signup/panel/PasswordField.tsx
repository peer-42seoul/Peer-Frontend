import { Control, FieldError } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'

import { ISignUpField, ISignUpInputs } from '@/types/ISignUpInputs'
import SignUpField from './SignUpField'

const PasswordField = ({
  control,
  error,
  showPassword,
  setShowPassword,
}: {
  control: Control<ISignUpInputs, any>
  error?: FieldError
  showPassword: 'password' | 'text'
  setShowPassword: Dispatch<SetStateAction<'password' | 'text'>>
}) => {
  const password: ISignUpField = {
    label: '비밀번호',
    name: 'password',
    control: control,
    error: error,
    rules: {
      required: '비밀번호를 입력하세요',
      pattern: {
        value:
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*<>])[A-Za-z\d~!@#$%^&*<>]{8,}$/i,
        message: '8자 이상의 영문, 숫자, 특수문자 조합이어야 합니다',
      },
    },
    placeholder: '비밀번호를 입력하세요',
    onClick: () => {
      setShowPassword(showPassword === 'password' ? 'text' : 'password')
    },
    inValidInput: error?.message ? true : false,
    inputProps: {
      minLength: 8,
      maxLength: 20,
    },
    type: showPassword,
  }
  return <SignUpField {...password} />
}

export default PasswordField
