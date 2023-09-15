'use client'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import {
  Switch,
  TextField,
  InputLabel,
  Button,
  Box,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material'
import { Fragment, useState } from 'react'
import axios from 'axios'

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

interface IFormField {
  label: string
  name: string
  control: any
  error: any
}

interface IPushAlarmToggle {
  label: string
  name: string
  control: any
}

const FormField = ({ label, name, control, error }: IFormField) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: `${label}을 입력해주세요`,
        }}
        render={({ field }) => (
          <>
            <InputLabel>{label}</InputLabel>
            <TextField {...field} />
          </>
        )}
      />
      {error && <Box>{error.message}</Box>}
    </>
  )
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
  } = useForm<IFormInputs>()
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  // const [isCodeSent, setIsCodeSent] = useState<boolean>(false)
  // const [isValidCode, setIsValidCode] = useState<boolean>(false)

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)

  return (
    <Fragment>
      <h2>Peer 회원가입 페이지</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="이메일"
          name="email"
          control={control}
          error={errors.email}
        />
        <Button
          onClick={() => {
            const email = getValues('email')
            if (!email) return
            console.log(email)
            try {
              axios.post('http://localhost:4000/email', {
                email: email,
              })
              setIsEmailSent(true)
              setIsValidEmail(true)
            } catch (error: any) {
              console.log(error)
              setIsEmailSent(true)
              if (error.response.status === 404) setIsValidEmail(false)
            }
          }}
        >
          이메일 인증
        </Button>
        {isEmailSent && !isValidEmail && (
          <Typography>유효하지 않은 이메일</Typography>
        )}
        {isEmailSent && isValidEmail && (
          <>
            <TextField />
            <Button onClick={() => {}}>인증코드 인증</Button>
          </>
        )}
        <FormField
          label="비밀번호"
          name="password"
          control={control}
          error={errors.password}
        />
        <FormField
          label="닉네임"
          name="nickName"
          control={control}
          error={errors.nickName}
        />
        <FormField
          label="이름"
          name="name"
          control={control}
          error={errors.name}
        />
        <FormField
          label="생년월일"
          name="birthDate"
          control={control}
          error={errors.birthDate}
        />
        <FormField
          label="전화번호"
          name="phoneNumber"
          control={control}
          error={errors.phoneNumber}
        />
        <PushAlarmToggle
          label="푸시 알림 동의"
          name="pushAlarmAgree"
          control={control}
        />
        <Button type="submit">제출</Button>
      </form>
    </Fragment>
  )
}

export default SignUp
