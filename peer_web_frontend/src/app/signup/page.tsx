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
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false)
  const [codeError, setCodeError] = useState<boolean>(false)
  const [isNickNameSent, setIsNickNameSent] = useState<boolean>(false)
  const [nickNameError, setNickNameError] = useState<boolean>(false)

  const submitEmail = async () => {
    const email = getValues('email')
    if (errors.email?.message) return
    if (email === undefined) {
      alert('이메일을 입력해주세요')
      return
    }
    setIsEmailSent(true)
    try {
      await axios.post(`${API_URL}/email`, {
        email: email,
      })
      setEmailError(false)
    } catch (error: any) {
      setEmailError(true)
      if (error.response?.status === 409) {
        alert('이미 가입된 이메일입니다')
      } else if (error.response?.status === 400) {
        alert('유효하지 않은 이메일입니다')
      } else {
        alert('알 수 없는 오류가 발생했습니다')
      }
    }
  }
  const submitCode = async () => {
    const code = getValues('code')
    if (errors.code?.message) return
    if (code === undefined) {
      alert('인증코드를 입력해주세요')
      return
    }
    setIsCodeSent(true)
    try {
      await axios.post(`${API_URL}/code`, {
        code: code,
      })
      setCodeError(false)
    } catch (error: any) {
      setCodeError(true)
      if (error.response?.status === 400) {
        alert('유효하지 않은 인증코드입니다')
      } else {
        alert('알 수 없는 오류가 발생했습니다')
      }
    }
  }
  const submitNickName = async () => {
    const nickName = getValues('nickName')
    if (errors.nickName?.message) return
    if (nickName === undefined) {
      alert('닉네임을 입력해주세요')
      return
    }
    setIsNickNameSent(true)
    try {
      await axios.post(`${API_URL}/nickname`, {
        nickName: nickName,
      })
      setNickNameError(false)
    } catch (error: any) {
      console.log(error)
      setNickNameError(true)
      if (error.response?.status === 400) {
        alert('유효하지 않은 닉네임입니다')
      } else if (error.response?.status === 409) {
        alert('이미 사용중인 닉네임입니다')
      } else {
        alert('알 수 없는 오류가 발생했습니다')
      }
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
      placeholder: '사용할 이메일을 입력하세요',
      onClick: submitEmail,
      buttonText: '이메일 중복확인',
      isInputValid: isEmailSent && !emailError,
    },
    code: {
      label: '인증코드',
      name: 'code',
      control: control,
      error: errors.code,
      rules: {
        required: '인증코드를 입력해주세요',
      },
      placeholder: '인증코드를 입력해주세요',
      onClick: submitCode,
      buttonText: '인증코드 확인',
      isInputValid: isCodeSent && !codeError,
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
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*<>])[A-Za-z\d~!@#$%^&*<>]{8,}$/i,
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
        minLength: {
          value: 2,
          message: '닉네임은 2자 이상이어야 합니다',
        },
      },
      placeholder: '닉네임을 입력하세요',
      onClick: submitNickName,
      buttonText: '닉네임 중복확인',
      isInputValid: isNickNameSent && !nickNameError,
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
        <FormField {...fieldProp.code} />
        <FormField {...fieldProp.password} />
        <FormField {...fieldProp.nickName} />
        <FormField {...fieldProp.name} />
        <Button
          sx={{
            display: 'block',
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
