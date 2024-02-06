'use client'

import {
  Box,
  Container,
  Typography,
  Button,
  InputAdornment,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import CuTextField from '@/components/CuTextField'

const LabelBox = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.5rem',
  fontSize: '0.875rem',
}

const Form = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
}

const SendCodeForm = ({
  email,
  setErrorMessage,
  openToast,
  setIsCodeSuccessful,
}: {
  email: string
  setErrorMessage: (message: string) => void
  openToast: () => void
  setIsCodeSuccessful: (isCodeSuccessful: boolean) => void
}) => {
  const API_URL = process.env.NEXT_PUBLIC_CSR_API
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<{ code: string }>()
  const [timer, setTimer] = useState(5 * 60)
  const router = useRouter()

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1)
    }, 1000)

    return () => {
      clearInterval(countdown)
    }
  }, [])

  useEffect(() => {
    if (timer === 0) {
      alert('인증 코드가 만료되었습니다.')
      router.push('/find-account')
    }
  }, [timer])

  const adornment = (
    <>
      <Typography variant="Caption" sx={{ marginRight: '12px' }}>{`${Math.floor(
        timer / 60,
      )}:${(timer % 60).toString().padStart(2, '0')}`}</Typography>
    </>
  )

  const onSubmit = async (data: { code: string }) => {
    const code = data.code

    try {
      const res = await axios.post(`${API_URL}/api/v1/signin/find-password`, {
        email: email,
        code: code,
      })
      if (res.status == 200) {
        setIsCodeSuccessful(true)
      }
    } catch (error: any) {
      if (error.response.status == 401 || error.response.status == 400) {
        setErrorMessage('유효한 코드가 아닙니다.')
        openToast()
      } else {
        alert('알 수 없는 오류가 발생했습니다.')
        window.location.reload()
      }
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={Form}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Controller
          name="code"
          control={control}
          defaultValue=""
          rules={{
            required: '코드를 입력해주세요',
          }}
          render={({ field }) => (
            <Container sx={LabelBox} disableGutters={true}>
              <CuTextFieldLabel htmlFor="code">
                <Typography variant="Caption">인증코드</Typography>
              </CuTextFieldLabel>
              <CuTextField
                {...field}
                type="code"
                id="code"
                placeholder="인증 코드를 입력하세요"
                style={{ width: '100%' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{adornment}</InputAdornment>
                  ),
                }}
              />
              {
                <Typography variant="Caption">
                  {errors.code ? errors.code.message : '\u00A0'}
                </Typography>
              }
            </Container>
          )}
        />
      </Box>
      <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting}
        fullWidth
      >
        임시 비밀번호 발급
      </Button>
    </Box>
  )
}

export default SendCodeForm
