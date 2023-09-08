'use client'

import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import axios from 'axios'

interface ILoginFormInput {
  userEmail: string
  password: string
}

const API_URL = 'http://localhost:8080'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
        //로그인 상태 관리 로직
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
          <label>이메일</label>
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
            render={({ field }) => <input {...field} />}
          />
          {errors.userEmail && <p>{errors.userEmail.message}</p>}
        </div>

        <div>
          <label>비밀번호</label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: '비밀번호를 입력해주세요',
            }}
            render={({ field }) => (
              <div>
                <input
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
        <button type="submit" disabled={isLoading}>로그인</button>
      </form>
    </>
  )
}

export default Login
