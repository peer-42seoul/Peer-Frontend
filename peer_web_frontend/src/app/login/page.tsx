'use client'

import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import useAuthStore from '@/states/useAuthStore'
import { useCookies } from 'react-cookie'

interface ILoginFormInput {
  userEmail: string
  password: string
}

const API_URL = 'https://localhost:8080'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuthStore()
  const [, setCookie] = useCookies(['refreshToken'])

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginFormInput>()

  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    console.log(data)
    setIsLoading(true)
    axios
      .post(`${API_URL}/login/`, {
        userEmail: data.userEmail,
        password: data.password,
      })
      .then((res) => {
        console.log(res)
        login(res.data.userId, res.data.accessToken)
        setCookie('refreshToken', res.data.refreshToken, { path: '/' })
      })
      .catch((error) => {
        console.log(error.message)
      })
    setIsLoading(false)
  }

  return (
    <>
      <h2>로그인 페이지</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="userEmail"
            control={control}
            defaultValue=""
            rules={{
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: '이메일 형식이 아닙니다',
              },
            }}
            render={({ field }) => (
              <div>
                <label htmlFor="userEmail">이메일</label>
                <input {...field} id="userEmail" />
              </div>
            )}
          />
          {errors.userEmail && <p>{errors.userEmail.message}</p>}
        </div>

        <div>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: '비밀번호를 입력해주세요',
            }}
            render={({ field }) => (
              <div>
                <label htmlFor="password">비밀번호</label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                ></input>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'hide' : 'show'}
                </button>
              </div>
            )}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          로그인
        </button>
      </form>
      <div>
        <button>Sign in with Google</button>
      </div>
    </>
  )
}

export default Login
