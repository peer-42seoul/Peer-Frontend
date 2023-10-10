import { Control, FieldError } from 'react-hook-form'

export interface ISignUpInputs {
  email: string
  code: string
  password: string
  name: string
  nickName: string
}

interface ISignUpFieldRules {
  required?: string
  pattern?: {
    value: RegExp
    message: string
  }
  minLength?: {
    value: number
    message: string
  }
  maxLength?: {
    value: number
    message: string
  }
  validate?: (value: string) => boolean | string
}

export interface ISignUpField {
  label: '이메일' | '인증코드' | '비밀번호' | '닉네임' | '이름'
  name: 'email' | 'code' | 'password' | 'nickName' | 'name'
  control: Control<ISignUpInputs, any>
  error: FieldError | undefined
  rules?: ISignUpFieldRules
  placeholder?: string
  onClick?: () => void
  onChange?: () => void
  buttonText?: string
  isInputValid?: boolean
  inputProps?: {
    minLength?: number
    maxLength?: number
  }
  type: 'text' | 'password' | 'number'
}

export interface ISignUpFields {
  email: ISignUpField
  code: ISignUpField
  password: ISignUpField
  nickName: ISignUpField
  name: ISignUpField
}
