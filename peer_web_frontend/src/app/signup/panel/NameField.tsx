import { Control, FieldError } from 'react-hook-form'

import { ISignUpField, ISignUpInputs } from '@/types/ISignUpInputs'
import SignUpField from './SignUpField'

const NameField = ({
  control,
  error,
}: {
  control: Control<ISignUpInputs, any>
  error: FieldError | undefined
}) => {
  const name: ISignUpField = {
    label: '이름',
    name: 'name',
    control: control,
    error: error,
    placeholder: '이름을 입력하세요',
    rules: {
      required: '이름을 입력하세요',
      minLength: {
        value: 2,
        message: '이름은 2자 이상이어야 합니다',
      },
    },
    inValidInput: error?.message ? true : false,
    inputProps: {
      minLength: 2,
      maxLength: 10,
    },
    type: 'text',
  }
  return <SignUpField {...name} />
}

export default NameField
