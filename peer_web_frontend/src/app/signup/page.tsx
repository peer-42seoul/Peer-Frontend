'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button, Typography, Box, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useState } from 'react'
import axios from 'axios'

import { ISignUpInputs, ISignUpFields } from '@/types/ISignUpInputs'
import SignUpField from './panel/SignUpField'
import Privacy from './panel/Privacy'

const SignUp = () => {
  const API_URL = 'http://localhost:4000'
  const router = useRouter()
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<ISignUpInputs>({ mode: 'onChange' })
  const [signUpStep, setSignUpStep] = useState<number>(0)
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false)
  const [codeError, setCodeError] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<'password' | 'text'>(
    'password',
  )
  const [isNickNameSent, setIsNickNameSent] = useState<boolean>(false)
  const [nickNameError, setNickNameError] = useState<boolean>(false)

  const submitEmail = async () => {
    const email = getValues('email')
    console.log(email)
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
        alert('그 밖의 오류') // 네트워크 오류는 어떻게 처리?
        setEmailError(false) // 나중에 제거해야 함!
      }
    }
  }

  const clickPrevStep = (signUpStep: number) => {
    if (signUpStep === 0) {
      router.back()
      return
    }
    setSignUpStep(signUpStep - 1)
  }

  const clickNextStep = (signUpStep: number) => {
    setSignUpStep(signUpStep + 1)
  }

  const submitCode = async () => {
    if (isEmailSent === false || emailError === true) {
      alert('이메일을 인증해주세요')
      return
    }
    const email = getValues('email')
    const code = getValues('code')
    const password = getValues('password')
    if (errors.code?.message) return
    if (password === undefined) {
      alert('패스워드를 입력해주세요')
      return
    }
    if (code === undefined) {
      alert('인증코드를 입력해주세요')
      return
    }
    if (errors.password?.message) {
      alert(errors.password.message)
      return
    }
    console.log(email, code)
    setIsCodeSent(true)
    try {
      await axios.post(`${API_URL}/code`, {
        email: email,
        code: code,
      })
      setCodeError(false)
    } catch (error: any) {
      setCodeError(true)
      if (error.response?.status === 401) {
        alert('유효하지 않은 인증코드입니다')
      } else if (error.response?.status === 400) {
        alert('유효한 이메일이 아닙니다')
      } else {
        alert('그 밖의 오류')
        setCodeError(false) // 나중에 제거해야 함!
        setSignUpStep(2)
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
        alert('그 밖의 오류')
        setNickNameError(false) // 나중에 제거해야 함!
      }
    }
  }

  const submitSignUpForm: SubmitHandler<ISignUpInputs> = async (data) => {
    if (isEmailSent === false || emailError === true) {
      alert('이메일을 인증해주세요')
      return
    }
    if (isCodeSent === false || codeError === true) {
      alert('인증코드를 인증해주세요')
      return
    }
    if (isNickNameSent === false || nickNameError === true) {
      alert('닉네임 중복확인을 해주세요')
      return
    }
    const { email, password, nickName, name } = data
    console.log(email, password, nickName, name)
    try {
      await axios.post(`${API_URL}/signup`, {
        email: email,
        password: password,
        nickName: nickName,
        name: name,
      })
    } catch (error: any) {
      console.log(error)
      return
    }
    router.push('/login')
  }

  const fieldProp: ISignUpFields = {
    email: {
      label: '이메일',
      name: 'email',
      control: control,
      error: errors.email,
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
      isInputValid: isEmailSent && !emailError,
      inputProps: {
        maxLength: 30,
      },
      type: 'text',
    },
    code: {
      label: '인증코드',
      name: 'code',
      control: control,
      error: errors.code,
      rules: {
        required: '인증코드를 입력하세요',
      },
      placeholder: '인증코드를 입력하세요',
      buttonText: '인증 확인',
      inputProps: {
        maxLength: 6,
      },
      type: 'text',
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
      onClick: () => {
        setShowPassword(showPassword === 'password' ? 'text' : 'password')
      },
      inputProps: {
        minLength: 8,
        maxLength: 20,
      },
      type: showPassword,
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
        maxLength: {
          value: 7,
          message: '닉네임은 7자 이하여야 합니다',
        },
      },
      placeholder: '닉네임을 입력하세요',
      onClick: submitNickName,
      onChange: () => {
        setIsNickNameSent(false)
      },
      buttonText: '중복확인',
      isInputValid: isNickNameSent && !nickNameError,
      inputProps: {
        minLength: 2,
        maxLength: 7,
      },
      type: 'text',
    },
    name: {
      label: '이름',
      name: 'name',
      control: control,
      error: errors.name,
      placeholder: '실명을 입력하세요',
      rules: {
        minLength: {
          value: 2,
          message: '두글자 이상 입력하세요',
        },
      },
      inputProps: {
        minLength: 2,
        maxLength: 20,
      },
      type: 'text',
    },
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50px',
      }}
      component="main"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <IconButton sx={{ textAlign: 'left' }} onClick={clickPrevStep}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography sx={{ textAlign: 'center', flexGrow: 1 }} component="h1">
            Peer 회원가입
          </Typography>
        </Box>
        {signUpStep === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '400px',
              marginTop: '30px',
            }}
          >
            <Privacy />
            <Button
              variant="contained"
              sx={{
                display: 'block',
                margin: 'auto',
                width: '50%',
                marginTop: '30px',
              }}
              onClick={() => {
                setSignUpStep(1)
              }}
            >
              다음
            </Button>
          </Box>
        )}
        <form onSubmit={handleSubmit(submitSignUpForm)}>
          {signUpStep === 1 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '400px',
                marginTop: '30px',
              }}
            >
              <SignUpField {...fieldProp.email} />
              <SignUpField {...fieldProp.code} />
              <SignUpField {...fieldProp.password} />
              <Button
                sx={{
                  display: 'block',
                  margin: 'auto',
                  width: '50%',
                }}
                variant="contained"
                onClick={submitCode}
              >
                다음
              </Button>
            </Box>
          )}
          {signUpStep === 2 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '400px',
                marginTop: '30px',
              }}
            >
              <SignUpField {...fieldProp.name} />
              <SignUpField {...fieldProp.nickName} />
              <Button
                sx={{
                  display: 'block',
                  margin: 'auto',
                  width: '50%',
                }}
                variant="contained"
                type="submit"
              >
                가입하기
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </Box>
  )
}

export default SignUp
