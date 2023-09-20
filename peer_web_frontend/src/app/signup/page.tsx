'use client'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Switch, Button, FormControlLabel, Stack } from '@mui/material'

import FormField from './panel/FormField'
import EmailField from './panel/EmailField'

interface IFormInputs {
  email: string
  code: string
  password: string
  passwordConfirm: string
  name: string
  nickName: string
  pushAlarmAgree: boolean
}

interface IPushAlarmToggle {
  label: string
  name: string
  control: any
}

const PushAlarmToggle = ({ label, name, control }: IPushAlarmToggle) => {
  return (
    <Stack>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel label={label} control={<Switch {...field} />} />
        )}
      />
    </Stack>
  )
}

const SignUp = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<IFormInputs>({ mode: 'onChange' })
  const inputValues = {
    password: {
      label: '비밀번호',
      name: 'password',
      control: control,
      error: errors.password,
      rules: {
        required: '비밀번호를 입력해주세요',
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
          message: '8자 이상의 영문, 숫자 조합이어야 합니다',
        },
      },
    },
    passwordConfirm: {
      label: '비밀번호 확인',
      name: 'passwordConfirm',
      control: control,
      error: errors.passwordConfirm,
      rules: {
        validate: () =>
          getValues('passwordConfirm') === getValues('password') ||
          '비밀번호가 일치하지 않습니다',
      },
    },
    nickName: {
      label: '닉네임',
      name: 'nickName',
      control: control,
      error: errors.nickName,
      rules: {
        required: '닉네임을 입력해주세요',
      },
    },
    name: {
      label: '이름',
      name: 'name',
      control: control,
      error: errors.name,
      rules: {
        required: '이름을 입력해주세요',
      },
    },
    pushAlarmToggle: {
      label: '푸시 알림 동의',
      name: 'pushAlarmAgree',
      control: control,
    },
  }

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)

  return (
    <>
      <h2>Peer 회원가입 페이지</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField
          control={control}
          error={errors.email}
          getValues={getValues}
        />
        <FormField {...inputValues.password} />
        <FormField {...inputValues.passwordConfirm} />
        <FormField {...inputValues.nickName} />
        <FormField {...inputValues.name} />
        <PushAlarmToggle {...inputValues.pushAlarmToggle} />
        <Button type="submit">제출</Button>
      </form>
    </>
  )
}

export default SignUp
