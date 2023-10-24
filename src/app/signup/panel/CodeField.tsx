import { Control, FieldError } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'

import { ISignUpField, ISignUpInputs } from '@/types/ISignUpInputs'
import SignUpField from './SignUpField'

const CodeField = ({
  control,
  error,
  setIsCodeSent,
  isCodeSent,
  codeError,
}: {
  control: Control<ISignUpInputs, any>
  error?: FieldError
  setIsCodeSent: Dispatch<SetStateAction<boolean>>
  isCodeSent: boolean
  codeError: boolean
}) => {
  const code: ISignUpField = {
    label: '인증코드',
    name: 'code',
    control: control,
    error: error,
    rules: {
      required: '인증코드를 입력하세요',
    },
    placeholder: '인증코드를 입력하세요',
    onChange: () => {
      setIsCodeSent(false)
    },
    inValidInput: isCodeSent && codeError,
    inputProps: {
      maxLength: 6,
    },
    type: 'text',
  }
  return <SignUpField {...code} />
}

export default CodeField
