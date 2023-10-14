'use client'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { Box, Typography, Button, Container } from '@mui/material'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import CuTextField from '@/components/CuTextField'

const Form = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
}

const LabelBox = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  fontSize: '14px',
}

const SendEmailForm = () => {
  const [isEmailSuccessful, setIsEmailSuccessful] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>()

  const onSubmit = async (data: { email: string }) => {
    console.log(data)

    try {
      console.log('isSubmitting:', isSubmitting)
      // 테스트용 post요청 코드
      const res = await axios.post(`http://localhost:8080/find`, {
        data,
      })
      console.log(res)

      setIsEmailSuccessful(true)
    } catch (error) {
      console.log(error)
      // 테스트 용 (추후 삭제)
      setIsEmailSuccessful(true)
    }
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={Form}>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: '이메일을 입력하세요',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: '올바른 이메일 형식이 아닙니다',
              },
            }}
            render={({ field }) => (
              <Container sx={LabelBox}>
                <CuTextFieldLabel htmlFor="email">이메일</CuTextFieldLabel>
                <CuTextField
                  field={field}
                  type="email"
                  id="email"
                  placeholder="이메일을 입력하세요"
                  style={{ width: '100%' }}
                />
                {errors.email && (
                  <Typography>{errors.email.message}</Typography>
                )}
              </Container>
            )}
          />
        </Box>
        {!isEmailSuccessful ? (
          <Button type="submit" disabled={isSubmitting}>
            임시 비밀번호 발송
          </Button>
        ) : (
          <Box>
            <Typography
              sx={{ color: 'd9d9d9', fontSize: '12px', textAlign: 'center' }}
            >
              메일이 오지 않았나요?
            </Typography>
            <Button type="submit" disabled={isSubmitting}>
              임시 비밀번호 재발송
            </Button>
          </Box>
        )}
      </Box>
    </>
  )
}

export default SendEmailForm
