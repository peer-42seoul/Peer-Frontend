'use client'

import { useState } from 'react'

import { Button, Typography, Box } from '@mui/material'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'

import { SubmitHandler, useForm } from 'react-hook-form'

import EmailField from './panel/EmailField'
import CodeField from './panel/CodeField'
import PasswordField from './panel/PasswordField'
import NameField from './panel/NameField'
import NickNameField from './panel/NickNameField'
import { Controller } from 'react-hook-form'
import { ISignUpInputs } from '@/types/ISignUpInputs'

const mainStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '50px',
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  marginTop: '30px',
}

const buttonStyle = {
  display: 'block',
  margin: 'auto',
  width: '50%',
}

const SignUp = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()
  const searchParams = useSearchParams()
  const socialEmail = searchParams.get('social-email')
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<ISignUpInputs>({ mode: 'onChange' })

  const [signUpStep, setSignUpStep] = useState<number>(0)
  const [emailSendStatus, setEmailSendStatus] = useState<
    'before' | 'submit' | 'error'
  >('before')
  const [codeSendStatus, setCodeSendStatus] = useState<
    'before' | 'submit' | 'error'
  >('before')
  const [nickNameSendStatus, setNickNameSendStatus] = useState<
    'before' | 'submit' | 'error'
  >('before')

  const [showPassword, setShowPassword] = useState<'password' | 'text'>(
    'password',
  )
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const submitEmail = async () => {
    setIsSubmitting(true)
    const email = getValues('email')
    if (email === undefined || errors.email?.message) {
      alert('이메일을 확인해주세요') // 토스트로 바꿔줄 예정
      setIsSubmitting(false)
      return
    }
    try {
      await axios.post(`${API_URL}/email`, {
        email: email,
      })
      setEmailSendStatus('submit')
      alert('인증코드가 전송되었습니다')
    } catch (error: any) {
      setEmailSendStatus('error')
      if (error.response?.status === 409) {
        alert('이미 가입된 이메일입니다')
      } else if (error.response?.status === 400) {
        alert('유효하지 않은 이메일입니다')
      } else {
        alert('그 밖의 오류') // 네트워크 오류는 어떻게 처리?
      }
    }
    setIsSubmitting(false)
  }

  const submitCode = async () => {
    setIsSubmitting(true)
    if (emailSendStatus !== 'submit') {
      alert('이메일을 인증해주세요') // 토스트로 바꿔줄 예정
      setIsSubmitting(false)
      return
    }
    const email = getValues('email')
    const code = getValues('code')
    if (code === undefined || errors.code?.message) {
      alert('인증코드를 확인해주세요') // 토스트로 바꿔줄 예정
      setIsSubmitting(false)
      return
    }
    try {
      await axios.post(`${API_URL}/code`, {
        email: email,
        code: code,
      })
      setCodeSendStatus('submit')
    } catch (error: any) {
      setCodeSendStatus('error')
      if (error.response?.status === 401) {
        alert('유효하지 않은 인증코드입니다')
      } else if (error.response?.status === 400) {
        alert('유효하지 않은 이메일입니다')
      } else {
        alert('그 밖의 오류') // 네트워크 오류는 어떻게 처리?
      }
    }
    setIsSubmitting(false)
  }

  const clickNext = () => {
    setIsSubmitting(true)
    if (emailSendStatus !== 'submit') {
      alert('이메일을 인증해주세요') // 토스트로 바꿔줄 예정
      setIsSubmitting(false)
      return
    }
    if (codeSendStatus !== 'submit') {
      alert('인증코드를 인증해주세요') // 토스트로 바꿔줄 예정
      setIsSubmitting(false)
      return
    }
    const password = getValues('password')
    if (password === undefined || errors.password?.message) {
      alert('비밀번호를 확인해주세요') // 토스트로 바꿔줄 예정
      setIsSubmitting(false)
      return
    }
    setIsSubmitting(false)
    setSignUpStep(signUpStep + 1)
  }

  const submitNickName = async () => {
    setIsSubmitting(true)
    const nickName = getValues('nickName')
    if (nickName === undefined || errors.nickName?.message) {
      alert('닉네임을 확인해주세요') // 토스트로 바꿔줄 예정
      setIsSubmitting(false)
      return
    }
    try {
      await axios.post(`${API_URL}/nickname`, {
        nickName: nickName,
      })
      setNickNameSendStatus('submit')
      alert('닉네임이 인증되었습니다')
    } catch (error: any) {
      setNickNameSendStatus('error')
      if (error.response?.status === 409) {
        alert('이미 가입된 닉네임입니다')
      } else if (error.response?.status === 400) {
        alert('유효하지 않은 닉네임입니다')
      } else {
        alert('그 밖의 오류') // 네트워크 오류는 어떻게 처리?
      }
    }
    setIsSubmitting(false)
  }

  const submitSignUp: SubmitHandler<ISignUpInputs> = async (data) => {
    setIsSubmitting(true)
    if (nickNameSendStatus !== 'submit') {
      alert('닉네임을 인증해주세요')
      setIsSubmitting(false)
      return
    }
    const { email, password, name, nickName } = data
    try {
      await axios.post(`${API_URL}/signup`, {
        email: email,
        password: password,
        name: name,
        nickName: nickName,
        socialEmail: socialEmail ? socialEmail : null,
      })
      alert('회원가입이 완료되었습니다')
      router.push('/') // 메인페이지로 이동
    } catch (error: any) {
      if (error.response?.status === 400) {
        alert('유효하지 않은 회원가입 정보입니다')
      } else if (error.response?.status === 409) {
        alert('소셜 로그인 정보가 잘못되었습니다')
      } else {
        alert('그 밖의 오류') // 네트워크 오류는 어떻게 처리?
      }
    }
    setIsSubmitting(false)
  }

  return (
    <Box sx={mainStyle} component="main">
      <Typography
        aria-label="회원가입"
        sx={{ textAlign: 'center', flexGrow: 1 }}
        component="h3"
      >
        회원가입
      </Typography>
      <form onSubmit={handleSubmit(submitSignUp)}>
        <Box sx={formStyle}>
          {signUpStep === 0 && (
            <>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: '이메일을 입력하세요',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: '유효한 이메일 형식이 아닙니다',
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <EmailField
                    field={field}
                    emailSendStatus={emailSendStatus}
                    setEmailSendStatus={setEmailSendStatus}
                    submitEmail={submitEmail}
                    isSubmitting={isSubmitting}
                  />
                )}
              />
              {(errors?.email && (
                <Typography color="error">{errors.email.message}</Typography>
              )) || <Typography>&nbsp;</Typography>}
              <Controller
                name="code"
                control={control}
                rules={{
                  required: '인증코드를 입력하세요',
                }}
                defaultValue=""
                render={({ field }) => (
                  <CodeField
                    field={field}
                    codeSendStatus={codeSendStatus}
                    setCodeSendStatus={setCodeSendStatus}
                    submitCode={submitCode}
                    isSubmitting={isSubmitting}
                  />
                )}
              />
              {(errors?.code && (
                <Typography color="error">{errors.code.message}</Typography>
              )) || <Typography>&nbsp;</Typography>}
              <Controller
                name="password"
                control={control}
                rules={{
                  required: '비밀번호를 입력하세요',
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*<>])[A-Za-z\d~!@#$%^&*<>]{8,}$/i,
                    message:
                      '8자 이상의 영문, 숫자, 특수문자 조합이어야 합니다',
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <PasswordField
                    field={field}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                )}
              />
              {(errors?.password && (
                <Typography color="error">{errors.password.message}</Typography>
              )) || <Typography>&nbsp;</Typography>}
              <Button
                sx={buttonStyle}
                variant="contained"
                onClick={clickNext}
                disabled={isSubmitting}
              >
                다음
              </Button>
            </>
          )}
          {signUpStep === 1 && (
            <>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: '이름을 입력하세요',
                  pattern: {
                    value: /^[가-힣]{2,4}$/i,
                    message: '한글 2 ~ 4자로 입력하세요',
                  },
                }}
                defaultValue=""
                render={({ field }) => <NameField field={field} />}
              />
              {(errors?.name && (
                <Typography color="error">{errors.name.message}</Typography>
              )) || <Typography>&nbsp;</Typography>}
              <Controller
                name="nickName"
                control={control}
                rules={{
                  required: '닉네임을 입력하세요',
                  minLength: {
                    value: 2,
                    message: '닉네임은 2자 이상이어야 합니다',
                  },
                  maxLength: {
                    value: 7,
                    message: '닉네임은 7자 이하여야 합니다',
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <NickNameField
                    field={field}
                    nickNameSendStatus={nickNameSendStatus}
                    setNickNameSendStatus={setNickNameSendStatus}
                    submitNickName={submitNickName}
                    isSubmitting={isSubmitting}
                  />
                )}
              />
              {(errors?.nickName && (
                <Typography color="error">{errors.nickName.message}</Typography>
              )) || <Typography>&nbsp;</Typography>}
              <Button
                sx={buttonStyle}
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                가입하기
              </Button>
            </>
          )}
        </Box>
      </form>
    </Box>
  )
}

export default SignUp
