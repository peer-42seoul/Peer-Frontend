'use client'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {
  Switch,
  Button,
  FormControlLabel,
  Stack,
  Typography,
  Box,
} from '@mui/material'
import { useState } from 'react'
import axios from 'axios'

import FormField from './panel/FormField'

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
  const API_URL = 'http://localhost:4000'
  const router = useRouter()
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<IFormInputs>({ mode: 'onChange' })
  const [isCodeVisible, setIsCodeVisible] = useState<boolean>(false)
  const submitEmail = () => {
    const email = getValues('email')
    if (errors.email?.message) return
    console.log(email)
    try {
      const response = axios.post(`${API_URL}/email`, {
        email: email,
      })
      console.log(response)
      setIsCodeVisible(true)
    } catch (error) {
      console.log(error)
      setIsCodeVisible(false)
    }
  }
  const fieldProp = {
    email: {
      label: '이메일',
      name: 'email',
      control: control,
      error: errors.email,
      rules: {
        required: '이메일을 입력해주세요',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: '유효한 이메일 형식이 아닙니다',
        },
      },
      onClick: submitEmail,
      buttonText: '인증코드 전송',
    },
    code: {
      label: '인증코드',
      name: 'code',
      control: control,
      error: errors.code,
      rules: {
        required: '인증코드를 입력해주세요',
      },
      onClick: () => {},
      buttonText: '인증코드 확인',
    },
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
        required: '비밀번호를 확인해주세요',
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
      onClick: () => {},
      buttonText: '닉네임 중복확인',
    },
    name: {
      label: '실명',
      name: 'name',
      control: control,
      error: errors.name,
      rules: {
        required: '본명을 입력해주세요',
      },
    },
    pushAlarmToggle: {
      label: '푸시 알림 동의',
      name: 'pushAlarmAgree',
      control: control,
    },
  }

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data)
    router.push('/login')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 'xs',
      }}
      component="main"
    >
      <Typography component="h2">Peer 회원가입</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField {...fieldProp.email} />
        {isCodeVisible && <FormField {...fieldProp.code} />}
        <FormField {...fieldProp.password} />
        <FormField {...fieldProp.passwordConfirm} />
        <FormField {...fieldProp.nickName} />
        <FormField {...fieldProp.name} />
        <PushAlarmToggle {...fieldProp.pushAlarmToggle} />
        <Button variant="contained" type="submit">
          회원가입
        </Button>
      </form>
    </Box>
  )
}

export default SignUp
