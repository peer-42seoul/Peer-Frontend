'use client'

import { useState } from 'react'

import { Button, Typography, Box } from '@mui/material'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'

import { SubmitHandler, useForm, Controller } from 'react-hook-form'

import EmailField from './panel/EmailField'
import CodeField from './panel/CodeField'
import PasswordField from './panel/PasswordField'
import NameField from './panel/NameField'
import NickNameField from './panel/NickNameField'
import { ISignUpInputs } from '@/types/ISignUpInputs'
import CodeTimer from './panel/CodeTimer'
import useToast from '@/hook/useToast'

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

const nextButtonStyle = {
  display: 'block',
  margin: 'auto',
  width: '50%',
  marginTop: '10px',
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
  } = useForm<ISignUpInputs>({
    defaultValues: {
      email: '',
      code: '',
      password: '',
      name: '',
      nickName: '',
    },
    mode: 'onChange',
  })

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [toastMessage, setToastMessage] = useState('')
  const { CuToast, isOpen, openToast, closeToast } = useToast()

  const submitEmail = async () => {
    setIsSubmitting(true)
    const email = getValues('email')
    if (email === '' || errors.email) {
      setEmailSendStatus('error')
      setToastMessage('이메일을 확인해주세요')
    } else {
      try {
        await axios.post(`${API_URL}/api/v1/signup/email`, {
          email: email,
        })
        setEmailSendStatus('submit')
        setToastMessage('인증코드가 전송되었습니다')
      } catch (error: any) {
        setEmailSendStatus('error')
        if (error.response?.status === 409) {
          setToastMessage('이미 가입된 이메일입니다')
        } else if (error.response?.status === 400) {
          setToastMessage('유효하지 않은 이메일입니다')
        } else {
          setToastMessage('그 밖의 오류')
        }
      }
    }
    setIsSubmitting(false)
    openToast()
  }

  const submitCode = async () => {
    setIsSubmitting(true)
    const email = getValues('email')
    const code = getValues('code')
    if (emailSendStatus !== 'submit') {
      setToastMessage('이메일을 인증해주세요')
      setEmailSendStatus('error')
    } else if (code === '' || errors.code) {
      setToastMessage('인증코드를 확인해주세요')
      setCodeSendStatus('error')
    } else {
      try {
        await axios.post(`${API_URL}/api/v1/signup/code`, {
          email: email,
          code: code,
        })
        setCodeSendStatus('submit')
      } catch (error: any) {
        setCodeSendStatus('error')
        if (error.response?.status === 401) {
          setToastMessage('유효하지 않은 인증코드입니다')
        } else if (error.response?.status === 400) {
          setToastMessage('유효하지 않은 이메일입니다')
        } else {
          setToastMessage('그 밖의 오류') // 네트워크 오류는 어떻게 처리?
        }
      }
    }
    setIsSubmitting(false)
    openToast()
  }

  const clickNext = () => {
    setIsSubmitting(true)
    const password = getValues('password')
    if (password === '' || errors.password) {
      setToastMessage('비밀번호를 확인해주세요')
    } else if (emailSendStatus !== 'submit') {
      setEmailSendStatus('error')
      setToastMessage('이메일을 인증해주세요')
    } else if (codeSendStatus !== 'submit') {
      setCodeSendStatus('error')
      setToastMessage('인증코드를 인증해주세요')
    } else {
      setSignUpStep(1)
      setIsSubmitting(false)
      return
    }
    setIsSubmitting(false)
    openToast()
  }

  const submitNickName = async () => {
    setIsSubmitting(true)
    const nickName = getValues('nickName')
    if (nickName === undefined || errors.nickName) {
      setNickNameSendStatus('error')
      setToastMessage('닉네임을 확인해주세요')
    }
    try {
      await axios.post(`${API_URL}/api/v1/signup/nickname`, {
        nickname: nickName,
      })
      setNickNameSendStatus('submit')
      setToastMessage('닉네임이 인증되었습니다')
    } catch (error: any) {
      setNickNameSendStatus('error')
      if (error.response?.status === 409) {
        setToastMessage('이미 가입된 닉네임입니다')
      } else if (error.response?.status === 400) {
        setToastMessage('유효하지 않은 닉네임입니다')
      } else {
        setToastMessage('그 밖의 오류') // 네트워크 오류는 어떻게 처리?
      }
    }
    setIsSubmitting(false)
    openToast()
  }

  const submitSignUp: SubmitHandler<ISignUpInputs> = async (data) => {
    setIsSubmitting(true)
    if (nickNameSendStatus !== 'submit') {
      setNickNameSendStatus('error')
      setToastMessage('닉네임을 인증해주세요')
    } else {
      const { email, password, name, nickName } = data
      try {
        const social = socialEmail ? socialEmail : null
        await axios.post(`${API_URL}/api/v1/signup/form`, {
          email: email,
          password: password,
          name: name,
          nickname: nickName,
          socialEmail: social,
        })
        setToastMessage('회원가입이 완료되었습니다')
        router.push('/login') // 로그인 페이지로 이동
      } catch (error: any) {
        if (error.response?.status === 400) {
          setToastMessage('유효하지 않은 회원가입 정보입니다')
        } else if (error.response?.status === 409) {
          setToastMessage('소셜 로그인 정보가 잘못되었습니다')
        } else {
          setToastMessage('그 밖의 오류')
        }
      }
    }
    openToast()
    setIsSubmitting(false)
  }

  return (
    <>
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
                  render={({ field }) => (
                    <EmailField
                      field={field}
                      emailSendStatus={emailSendStatus}
                      submitEmail={submitEmail}
                      isSubmitting={isSubmitting}
                      error={errors?.email}
                    />
                  )}
                />
                <Controller
                  name="code"
                  control={control}
                  rules={{
                    required: '인증코드를 입력하세요',
                  }}
                  render={({ field }) => (
                    <CodeField
                      field={field}
                      codeSendStatus={codeSendStatus}
                      submitCode={submitCode}
                      isSubmitting={isSubmitting}
                    />
                  )}
                />
                {(emailSendStatus === 'submit' &&
                  codeSendStatus !== 'submit' && (
                    <CodeTimer setEmailSendStatus={setEmailSendStatus} />
                  )) || <Typography>&nbsp;</Typography>}
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: '비밀번호를 입력하세요',
                    validate: {
                      minLength: (value) =>
                        value.length >= 8 || '비밀번호는 8자 이상이어야 합니다',
                      includeNumber: (value) =>
                        /\d/.test(value) || '숫자를 포함해야 합니다',
                      includeSpecial: (value) =>
                        /[~!@#$%^&*<>]/.test(value) ||
                        '특수문자를 포함해야 합니다',
                      includeAlphabet: (value) =>
                        (/[A-Z]/.test(value) && /[a-z]/.test(value)) ||
                        '대소문자를 포함해야 합니다',
                    },
                  }}
                  render={({ field }) => <PasswordField field={field} />}
                />
                <Button
                  sx={nextButtonStyle}
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
                  render={({ field }) => (
                    <NameField field={field} error={errors?.name} />
                  )}
                />
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
                    pattern: {
                      value: /^[가-힣a-zA-Z0-9]+$/i,
                      message: '한글, 영문, 숫자만 사용할 수 있습니다',
                    },
                  }}
                  render={({ field }) => (
                    <NickNameField
                      field={field}
                      nickNameSendStatus={nickNameSendStatus}
                      setNickNameSendStatus={setNickNameSendStatus}
                      submitNickName={submitNickName}
                      isSubmitting={isSubmitting}
                      error={errors?.nickName}
                    />
                  )}
                />
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
      <CuToast
        open={isOpen}
        onClose={closeToast}
        severity={
          emailSendStatus === 'error' ||
          codeSendStatus === 'error' ||
          nickNameSendStatus === 'error' ||
          toastMessage.includes('확인')
            ? 'error'
            : 'info'
        }
      >
        <Typography>{toastMessage}</Typography>
      </CuToast>
    </>
  )
}

export default SignUp
