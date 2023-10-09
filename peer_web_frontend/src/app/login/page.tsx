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

const PCBase = {
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '140px',
}

const PCLoginBox = {
  display: 'flex',
  width: '496px',
  padding: '24px 24px 40px 24px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '48px',
  borderRadius: '16px',
  border: '1px solid #000',
}

const PCForm = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
}

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
      <Box sx={PCBase}>
        <Box sx={PCLoginBox}>
          <Typography>Peer</Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={PCForm}>
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
                    <TextField
                      {...field}
                      id="userEmail"
                      sx={{ width: '500px' }}
                      placeholder="이메일을 입력하세요."
                    />
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="비밀번호를 입력하세요."
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
          </Box>
          <Box sx={PCForm}>
            <Typography>간편 로그인</Typography>
            <Box sx={{ display: 'flex' }}>
              <div style={{ textAlign: 'center' }}>
                <Button href={`${API_URL}/oauth2/authorization/ft`}>
                  42Seoul
                </Button>
                <Typography>42서울</Typography>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Button href={`${API_URL}/oauth2/authorization/google`}>
                  Google
                </Button>
                <Typography>구글</Typography>
              </div>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '428px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button>회원가입</Button>
            <Button>비밀번호 찾기</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Login
