'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button, Typography, Box, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useState } from 'react'
import axios from 'axios'

import FormField from './panel/FormField'

interface IFormInputs {
  email: string
  code: string
  password: string
  name: string
  nickName: string
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
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
  const [isCodeValid, setIsCodeValid] = useState<boolean>(false)
  const [isNickNameValid, setIsNickNameValid] = useState<boolean>(false)
  const submitEmail = async () => {
    const email = getValues('email')
    if (errors.email?.message) return
    console.log(email)
    try {
      const response = await axios.post(`${API_URL}/email`, {
        email: email,
      })
      console.log(response)
      setIsEmailValid(true)
    } catch (error) {
      console.log(error)
    }
  }
  const submitCode = async () => {
    const code = getValues('code')
    if (errors.code?.message) return
    console.log(code)
    try {
      const response = await axios.post(`${API_URL}/code`, {
        code: code,
      })
      console.log(response)
      setIsCodeValid(true)
    } catch (error) {
      console.log(error)
      setIsCodeValid(false)
    }
  }
  const submitNickName = async () => {
    const nickName = getValues('nickName')
    if (errors.nickName?.message) return
    console.log(nickName)
    try {
      const response = await axios.post(`${API_URL}/nickname`, {
        nickName: nickName,
      })
      console.log(response)
      setIsNickNameValid(true)
    } catch (error) {
      console.log(error)
      setIsNickNameValid(false)
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
        validate: () =>
          !isEmailValid && '이메일이 유효하지 않습니다. 다시 시도해주세요',
      },
      placeholder: '사용할 이메일을 입력하세요',
      onClick: submitEmail,
      buttonText: '인증코드 전송',
      isInputValid: isEmailValid,
    },
    code: {
      label: '인증코드',
      name: 'code',
      control: control,
      error: errors.code,
      rules: {
        required: '인증코드를 입력해주세요',
        validate: () =>
          !isCodeValid && '인증코드가 일치하지 않습니다. 다시 시도해주세요',
      },
      placeholder: '인증코드를 입력해주세요',
      onClick: submitCode,
      buttonText: '인증코드 확인',
      isInputValid: isCodeValid,
    },
    password: {
      label: '비밀번호',
      name: 'password',
      control: control,
      error: errors.password,
      rules: {
        required: '비밀번호를 입력하세요',
        pattern: {
          value:
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*(){}[]\/<>])[A-Za-z\d~!@#$%^&*(){}[]\/<>]{8,}$/i,
          message: '8자 이상의 영문, 숫자, 특수문자 조합이어야 합니다',
        },
      },
      placeholder: '비밀번호를 입력하세요',
    },
    nickName: {
      label: '닉네임',
      name: 'nickName',
      control: control,
      error: errors.nickName,
      rules: {
        required: '닉네임을 입력하세요',
        validate: () =>
          !isNickNameValid && '닉네임이 유효하지 않습니다 다시 시도해주세요',
      },
      placeholder: '닉네임을 입력하세요',
      onClick: submitNickName,
      buttonText: '닉네임 중복확인',
      isInputValid: isNickNameValid,
    },
    name: {
      label: '이름',
      name: 'name',
      control: control,
      error: errors.name,
      placeholder: '실명을 입력하세요',
      rules: {
        required: '실명을 입력하세요',
      },
    },
  }
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
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
        width: '100%',
      }}
      component="main"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '70%',
          alignItems: 'center',
        }}
      >
        <IconButton
          sx={{ textAlign: 'left' }}
          onClick={() => {
            router.back()
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography sx={{ textAlign: 'center', flexGrow: 1 }} component="h2">
          Peer 회원가입
        </Typography>
      </Box>
      <form
        style={{ width: '70%', display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField {...fieldProp.email} />
        {isEmailValid && <FormField {...fieldProp.code} />}
        <FormField {...fieldProp.password} />
        <FormField {...fieldProp.nickName} />
        <FormField {...fieldProp.name} />
        <Button
          sx={{
            display: 'box',
            marginTop: '10px',
          }}
          variant="contained"
          type="submit"
        >
          가입하기
        </Button>
      </form>
    </Box>
  )
}

export default SignUp
