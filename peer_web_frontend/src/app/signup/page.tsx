'use client'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Switch, Button, FormControlLabel, Stack } from '@mui/material'
import { Fragment } from 'react'

import FormField from './panel/FormField'
import EmailField from './panel/EmailField'

interface IFormInputs {
  email: string
  code: string
  password: string
  name: string
  nickName: string
  birthDate: string
  phoneNumber: string
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
    },
    nickName: {
      label: '닉네임',
      name: 'nickName',
      control: control,
      error: errors.nickName,
    },
    name: {
      label: '이름',
      name: 'name',
      control: control,
      error: errors.name,
    },
    birthDate: {
      label: '생년월일',
      name: 'birthDate',
      control: control,
      error: errors.birthDate,
    },
    phoneNumber: {
      label: '전화번호',
      name: 'phoneNumber',
      control: control,
      error: errors.phoneNumber,
    },
    pushAlarmToggle: {
      label: '푸시 알림 동의',
      name: 'pushAlarmAgree',
      control: control,
    },
  }

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)

  return (
    <Fragment>
      <h2>Peer 회원가입 페이지</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField
          control={control}
          error={errors.email}
          getValues={getValues}
        />
        <FormField {...inputValues.password} />
        <FormField {...inputValues.nickName} />
        <FormField {...inputValues.name} />
        <FormField {...inputValues.birthDate} />
        <FormField {...inputValues.phoneNumber} />
        <PushAlarmToggle {...inputValues.pushAlarmToggle} />
        <Button type="submit">제출</Button>
      </form>
    </Fragment>
  )
}

export default SignUp
