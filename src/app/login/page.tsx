'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import useAuthStore from '@/states/useAuthStore'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import CuTextField from '@/components/CuTextField'
//import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import OauthLoginBox from './panel/OauthLoginBox'
import useToast from '@/hook/useToast'
import { useRouter, useSearchParams } from 'next/navigation'
import BoxBase from '@/components/BoxBase'

interface ILoginFormInput {
  userEmail: string
  password: string
}

const PCLoginBox = {
  display: 'flex',
  position: 'relative',
  width: '544px',
  padding: '40px 64px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '48px',
  borderRadius: '16px',
  border: '1px solid #000',
}

const MobileLoginBox = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 16px',
  gap: '24px',
  borderRadius: '16px',
  border: '1px solid #000',
}

const Form = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
}

const PCLabelBox = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  fontSize: '14px',
}

const Login = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { isLogin, login } = useAuthStore()
  const [errorMessage, setErrorMessage] = useState('')
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginFormInput>()

  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    setIsLoading(true)
    axios
      .post(
        `${API_URL}/api/v1/signin`,
        {
          userEmail: data.userEmail,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        login(res.data.accessToken)
      })
      .catch((error) => {
        if (error.response?.status == 401)
          setErrorMessage('이메일과 비밀번호를 다시 확인해주세요.')
        else setErrorMessage('알 수 없는 오류가 발생했습니다.')
        openToast()
      })
    setIsLoading(false)
  }

  useEffect(() => {
    if (isLogin) {
      if (redirect) {
        console.log('redirect in login', redirect)
        router.push(redirect)
      } else router.push('/')
    }
    if (redirect) {
      setErrorMessage('로그인이 필요한 서비스입니다.')
      openToast()
    }
  }, [isLogin, redirect])

  return (
    <>
      <BoxBase pcSx={PCLoginBox} mobileSx={MobileLoginBox}>
        <Typography>피어 로그인</Typography>
        <Box sx={Form}>
          <OauthLoginBox />
        </Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={Form}>
          <Box sx={{ display: 'flex', width: '100%' }}>
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
                <Box sx={PCLabelBox}>
                  {/* <CuTextFieldLabel
                      htmlFor="userEmail"
                      style={{ color: '#000', font: 'inherit' }}
                    >
                      이메일
                    </CuTextFieldLabel> */}
                  <CuTextField
                    {...field}
                    style={{ width: '100%' }}
                    placeholder="이메일을 입력하세요."
                  />
                  {errors.userEmail ? (
                    <Typography color="error">
                      {errors.userEmail?.message}
                    </Typography>
                  ) : (
                    <Typography>&nbsp;</Typography>
                  )}
                </Box>
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', width: '100%' }}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: '비밀번호를 입력해주세요',
              }}
              render={({ field }) => (
                <Box sx={PCLabelBox}>
                  {/* <CuTextFieldLabel
                      htmlFor="password"
                      style={{ color: '#000', font: 'inherit' }}
                    >
                      비밀번호
                    </CuTextFieldLabel> */}
                  <CuTextField
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    style={{ width: '100%' }}
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
                    placeholder="비밀번호를 입력하세요."
                  />
                  {errors.password ? (
                    <Typography color="error">
                      {errors.password?.message}
                    </Typography>
                  ) : (
                    <Typography>&nbsp;</Typography>
                  )}
                </Box>
              )}
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            로그인
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '16px',
            alignItems: 'flex-end',
          }}
        >
          <Button fullWidth variant="outlined" href="/privacy">
            피어가 처음이에요!
          </Button>
          <Button href="/find-account">비밀번호 찾기</Button>
        </Box>
      </BoxBase>

      <CuToast open={isOpen} onClose={closeToast} severity="error">
        <Typography>{errorMessage}</Typography>
      </CuToast>
    </>
  )
}

export default Login

