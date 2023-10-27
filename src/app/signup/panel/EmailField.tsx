import { Control, FieldError } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'

import { ISignUpField, ISignUpInputs } from '@/types/ISignUpInputs'
import SignUpField from './SignUpField'

const EmailField = ({
  control,
  error,
  submitEmail,
  setIsEmailSent,
  isEmailSent,
  emailError,
  isSubmitting,
}: {
  control: Control<ISignUpInputs, any>
  error?: FieldError
  submitEmail: () => void
  setIsEmailSent: Dispatch<SetStateAction<boolean>>
  isEmailSent: boolean
  emailError: boolean
  isSubmitting: boolean
}) => {
  const email: ISignUpField = {
    label: '이메일',
    name: 'email',
    control: control,
    error: error,
    rules: {
      required: '이메일을 입력하세요',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: '유효한 이메일 형식이 아닙니다',
      },
    },
    placeholder: '이메일을 입력하세요',
    onClick: submitEmail,
    onChange: () => {
      setIsEmailSent(false)
    },
    buttonText: '이메일 인증',
    inValidInput: isEmailSent && emailError,
    inputProps: {
      maxLength: 30,
    },
    type: 'text',
    isSubmitting: isSubmitting,
  }
  return <SignUpField {...email} />
}

export default EmailField
