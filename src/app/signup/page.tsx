'use client'

import { useState, useEffect } from 'react'
import useAuthStore from '@/states/useAuthStore'
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
import BoxBase from '@/components/BoxBase'
import useToast from '@/states/useToast'
import * as style from './signup.style'
import EncryptedSender from '@/components/EncryptedSender'
import { EApiType } from '@/types/EApiType'

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

  // 로그인 상태일 경우 메인 페이지로 이동
  useEffect(() => {
    const isLogin = useAuthStore.getState().isLogin
    if (isLogin) router.replace('/')
  }, [])

  const [SignUpStep, setSignUpStep] = useState<number>(0)
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

  const { openToast, closeToast } = useToast()

  // EncryptedSender에서 사용하는 변수 및 함수

  const [payload, setPayload] = useState<any>(null)

  const onSuccess = () => {
    router.push('/login')
  }

  const onError = (message: string) => {
    if (message) {
      openToast({
        severity: 'error',
        message: message,
      })
    } else {
      openToast({
        severity: 'error',
        message: '알 수 없는 오류가 발생했습니다',
      })
    }
  }

  const submitEmail = async () => {
    setIsSubmitting(true)
    closeToast()
    const email = getValues('email')
    if (email === '' || errors.email) {
      setEmailSendStatus('error')
      openToast({
        severity: 'error',
        message: '이메일을 확인해주세요',
      })
    } else {
      await axios
        .post(`${API_URL}/api/v1/signup/email`, {
          email: email,
        })
        .then(() => {
          setEmailSendStatus('submit')
          openToast({
            severity: 'info',
            message: '인증코드가 발송되었습니다.',
          })
        })
        .catch((error) => {
          setEmailSendStatus('error')
          console.log(error)
          if (error.response.data.message) {
            openToast({
              severity: 'error',
              message: error.response.data.message,
            })
          } else {
            openToast({
              severity: 'error',
              message: '알 수 없는 오류가 발생했습니다.',
            })
          }
        })
    }
    setIsSubmitting(false)
  }

  const submitCode = async () => {
    setIsSubmitting(true)
    closeToast()
    const email = getValues('email')
    const code = getValues('code')
    if (emailSendStatus !== 'submit') {
      openToast({
        severity: 'error',
        message: '이메일을 인증해주세요',
      })
    } else if (code === '' || errors.code) {
      openToast({
        severity: 'error',
        message: '인증코드를 확인해주세요',
      })
    } else {
      try {
        await axios.post(`${API_URL}/api/v1/signup/code`, {
          email: email,
          code: code,
        })
        setCodeSendStatus('submit')
        openToast({
          severity: 'info',
          message: '인증코드가 확인되었습니다.',
        })
      } catch (error: any) {
        setCodeSendStatus('error')
        if (error.response?.status === 401) {
          openToast({
            severity: 'error',
            message: '유효하지 않은 인증코드입니다',
          })
        } else if (error.response?.status === 400) {
          openToast({
            severity: 'error',
            message: '유효하지 않은 이메일입니다',
          })
        } else {
          openToast({
            severity: 'error',
            message: '알 수 없는 오류가 발생했습니다',
          })
        }
      }
    }
    setIsSubmitting(false)
  }

  const clickNext = () => {
    setIsSubmitting(true)
    closeToast()
    const password = getValues('password')
    if (password === '' || errors.password) {
      openToast({
        severity: 'error',
        message: errors.password?.message || '비밀번호를 확인해주세요',
      })
    } else if (emailSendStatus !== 'submit') {
      openToast({
        severity: 'error',
        message: '이메일을 인증해주세요',
      })
    } else if (codeSendStatus !== 'submit') {
      openToast({
        severity: 'error',
        message: '코드를 인증해주세요',
      })
    } else {
      setSignUpStep(1)
      setIsSubmitting(false)
      return
    }
    setIsSubmitting(false)
  }

  const submitNickName = async () => {
    setIsSubmitting(true)
    closeToast()
    const nickName = getValues('nickName')
    if (nickName === undefined || errors.nickName) {
      openToast({
        severity: 'error',
        message: '닉네임을 확인해주세요',
      })
    }
    try {
      await axios.post(`${API_URL}/api/v1/signup/nickname`, {
        nickname: nickName,
      })
      setNickNameSendStatus('submit')
      openToast({
        severity: 'info',
        message: '닉네임이 확인되었습니다',
      })
    } catch (error: any) {
      setNickNameSendStatus('error')
      if (error.response?.status === 409) {
        openToast({
          severity: 'error',
          message: '이미 가입된 닉네임입니다',
        })
      } else if (error.response?.status === 400) {
        openToast({
          severity: 'error',
          message: '유효하지 않은 닉네임입니다',
        })
      } else {
        openToast({
          severity: 'error',
          message: '알 수 없는 오류가 발생했습니다',
        })
      }
    }
    setIsSubmitting(false)
  }

  const submitSignUp: SubmitHandler<ISignUpInputs> = async (data) => {
    closeToast()
    if (nickNameSendStatus !== 'submit') {
      openToast({
        severity: 'error',
        message: '닉네임을 인증해주세요',
      })
    } else {
      const { email, password, name, nickName } = data
      const social = socialEmail ? socialEmail : null
      setPayload({
        email: email,
        password: password,
        name: name,
        nickname: nickName,
        socialEmail: social,
      })
    }
  }

  return (
    <>
      <BoxBase mobileSx={style.MobileSignUpBox} pcSx={style.PCSignUpBox}>
        <Typography
          aria-label="회원가입"
          sx={{ textAlign: 'center' }}
          variant="Title3Emphasis"
        >
          회원가입
        </Typography>
        <EncryptedSender
          apiType={EApiType.SIGN_UP}
          payload={payload}
          setPayload={setPayload}
          onSuccess={onSuccess}
          onError={onError}
          setIsLoading={setIsSubmitting}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(submitSignUp)}
            sx={style.formStyle}
          >
            {SignUpStep === 0 && (
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
                  )) || <Typography variant="Caption">&nbsp;</Typography>}
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: '비밀번호를 입력하세요.',
                    validate: {
                      minLength: (value) =>
                        value.length >= 8 || '비밀번호는 8자 이상이어야 합니다',
                      includeNumber: (value) =>
                        /\d/.test(value) || '비밀번호는 숫자를 포함해야 합니다',
                      includeSpecial: (value) =>
                        /[!@#$%^&*]/.test(value) ||
                        '비밀번호는 특수문자를 포함해야 합니다',
                      includeAlphabet: (value) =>
                        (/[A-Z]/.test(value) && /[a-z]/.test(value)) ||
                        '비밀번호는 대소문자를 포함해야 합니다',
                      patternMatch: (value) =>
                        /^[A-Za-z0-9!@#$%^&*]*$/.test(value) ||
                        '비밀번호는 영문, 숫자, 특수문자(!@#$%^&*)만 사용할 수 있습니다',
                    },
                  }}
                  render={({ field }) => (
                    <PasswordField field={field} control={control} />
                  )}
                />
                <Button
                  sx={style.buttonStyle}
                  variant="contained"
                  onClick={clickNext}
                  disabled={isSubmitting}
                  fullWidth
                >
                  다음
                </Button>
              </>
            )}
            {SignUpStep === 1 && (
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
                      value: 30,
                      message: '닉네임은 30자 이하여야 합니다',
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
                  sx={style.buttonStyle}
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                >
                  가입 완료
                </Button>
              </>
            )}
          </Box>
        </EncryptedSender>
      </BoxBase>
    </>
  )
}

export default SignUp
