'use client'

import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import useAuthStore from '@/states/useAuthStore'
import { useCookies } from 'react-cookie'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface ILoginFormInput {
  userEmail: string
  password: string
}

const API_URL = process.env.API_URL

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
        <Box>
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
              <Box>
                <InputLabel htmlFor="userEmail">이메일</InputLabel>
                <TextField {...field} id="userEmail" sx={{ width: '500px' }} />
              </Box>
            )}
          />
          {errors.userEmail && (
            <Typography>{errors.userEmail.message}</Typography>
          )}
        </Box>

        <Box>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: '비밀번호를 입력해주세요',
            }}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="password">비밀번호</InputLabel>
                <TextField
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                  sx={{ width: '500px' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}
          />
          {errors.password && (
            <Typography>{errors.password.message}</Typography>
          )}
        </Box>
        <Button type="submit" disabled={isLoading}>
          로그인
        </Button>
      </form>
      <Box>
        <Button href={`${API_URL}/oauth2/authorization/ft`}>
          Sign in with 42Seoul
        </Button>
      </Box>
      <Box>
        <Button href={`${API_URL}/oauth2/authorization/google`}>
          Sign in with Google
        </Button>
      </Box>
    </>
  )
}

export default Login
