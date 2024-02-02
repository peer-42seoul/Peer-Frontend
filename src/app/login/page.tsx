'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import useAuthStore from '@/states/useAuthStore'
import { Box, Button, InputAdornment, Typography } from '@mui/material'
import CuTextField from '@/components/CuTextField'
import OauthLoginBox from './panel/OauthLoginBox'
import useToast from '@/states/useToast'
import { useRouter, useSearchParams } from 'next/navigation'
import BoxBase from '@/components/BoxBase'
import EyeIcon from '@/components/EyeIcon'
import EncryptedSender from '@/components/EncryptedSender'
import { EApiType } from '@/types/EApiType'
import * as style from './login.style'

interface ILoginFormInput {
  userEmail: string
  password: string
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState<'password' | 'text'>(
    'password',
  )
  const { isLogin, login } = useAuthStore()

  const { openToast, closeToast } = useToast()

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')

  // encrypted sender를 위한 변수
  const [payload, setPayload] = useState<any>(null)
  const [data, setData] = useState<any>(null)

  const onSuccess = () => {
    login(data.accessToken)
  }

  const onError = (message: string) => {
    openToast({
      message,
      severity: 'error',
    })
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginFormInput>()

  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    closeToast()
    setPayload({
      userEmail: data.userEmail,
      password: data.password,
    })
  }

  useEffect(() => {
    if (isLogin) {
      if (redirect) {
        console.log('redirect in login', redirect)
        router.push(redirect)
      } else router.push('/')
    } else if (redirect) {
      openToast({
        message: '로그인이 필요한 서비스입니다.',
        severity: 'error',
      })
    }
  }, [isLogin, redirect])

  return (
    <>
      <BoxBase pcSx={style.PCLoginBox} mobileSx={style.MobileLoginBox}>
        <Typography variant="Title3">로그인</Typography>
        <Box sx={style.Form}>
          <OauthLoginBox />
        </Box>
        <EncryptedSender
          apiType={EApiType.SIGN_IN}
          payload={payload}
          setPayload={setPayload}
          setData={setData}
          onSuccess={onSuccess}
          onError={onError}
          axiosOption={{ withCredentials: true }}
          setIsLoading={setIsLoading}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={style.Form}
          >
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
                  <Box sx={style.PCLabelBox}>
                    <CuTextField
                      {...field}
                      style={{ width: '100%' }}
                      placeholder="이메일을 입력하세요."
                    />
                    <Typography color="error" variant="Caption">
                      {errors.userEmail?.message || '\u00A0'}
                    </Typography>
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
                  <Box sx={style.PCLabelBox}>
                    <CuTextField
                      type={showPassword}
                      {...field}
                      style={{ width: '100%' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <EyeIcon
                              showPassword={showPassword}
                              setShowPassword={setShowPassword}
                            />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="비밀번호를 입력하세요."
                    />
                    <Typography color="error" variant="Caption">
                      {errors.password?.message || '\u00A0'}
                    </Typography>
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
        </EncryptedSender>

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
          <Button href="/find-account">
            <Typography variant="Caption" color="text.alternative">
              비밀번호 찾기
            </Typography>
          </Button>
        </Box>
      </BoxBase>
    </>
  )
}

export default Login
