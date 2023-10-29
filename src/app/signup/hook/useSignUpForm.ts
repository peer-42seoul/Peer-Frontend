import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'

import { ISignUpInputs } from '@/types/ISignUpInputs'

const useSignUpForm = () => {
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
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false)
  const [codeError, setCodeError] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<'password' | 'text'>(
    'password',
  )
  const [isNickNameSent, setIsNickNameSent] = useState<boolean>(false)
  const [nickNameError, setNickNameError] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // const { EmailToast, is } = useToast()

  const submitEmail = async () => {
    setIsSubmitting(true)
    setIsEmailSent(true)
    const email = getValues('email')
    if (email === undefined || errors.email?.message) {
      alert('이메일을 확인해주세요') // 토스트로 바꿔줄 예정
      setEmailError(true)
      setIsSubmitting(false)
      return
    }
    try {
      await axios.post(`${API_URL}/email`, {
        email: email,
      })
      setEmailError(false)
      alert('인증코드가 전송되었습니다')
    } catch (error: any) {
      setEmailError(true)
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
    setIsCodeSent(true)
    if (isEmailSent === false || emailError === true) {
      alert('이메일을 인증해주세요') // 토스트로 바꿔줄 예정
      setIsSubmitting(false)
      return
    }
    const email = getValues('email')
    const code = getValues('code')
    const password = getValues('password')
    if (code === undefined || errors.code?.message) {
      alert('인증코드를 확인해주세요') // 토스트로 바꿔줄 예정
      setCodeError(true)
      return
    }
    if (password === undefined || errors.password?.message) {
      alert('비밀번호를 확인해주세요') // 토스트로 바꿔줄 예정
      return
    }
    try {
      await axios.post(`${API_URL}/code`, {
        email: email,
        code: code,
      })
      setCodeError(false)
      setSignUpStep(1)
    } catch (error: any) {
      setCodeError(true)
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

  const submitNickName = async () => {
    setIsSubmitting(true)
    setIsNickNameSent(true)
    const nickName = getValues('nickName')
    if (nickName === undefined || errors.nickName?.message) {
      alert('닉네임을 확인해주세요') // 토스트로 바꿔줄 예정
      setNickNameError(true)
      setIsSubmitting(false)
      return
    }
    try {
      await axios.post(`${API_URL}/nickname`, {
        nickName: nickName,
      })
      setNickNameError(false)
      alert('닉네임이 인증되었습니다')
    } catch (error: any) {
      setNickNameError(true)
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
    if (isEmailSent === false || emailError === true) {
      alert('이메일을 인증해주세요')
      setIsSubmitting(false)
      return
    }
    if (isCodeSent === false || codeError === true) {
      alert('인증코드를 인증해주세요')
      setIsSubmitting(false)
      return
    }
    if (isNickNameSent === false || nickNameError === true) {
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

  return {
    signUpStep,
    isEmailSent,
    emailError,
    isCodeSent,
    codeError,
    isNickNameSent,
    nickNameError,
    showPassword,
    setShowPassword,
    setIsEmailSent,
    setIsCodeSent,
    setIsNickNameSent,
    submitEmail,
    submitCode,
    submitNickName,
    submitSignUp,
    handleSubmit,
    control,
    errors,
    isSubmitting,
  }
}

export default useSignUpForm
