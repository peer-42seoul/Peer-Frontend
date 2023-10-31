'use client'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { Box, Typography, Button, Container } from '@mui/material'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import CuTextField from '@/components/CuTextField'
import SendCodeForm from './SendCodeForm'
import useToast from '@/hook/useToast'

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
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [isEmailSuccessful, setIsEmailSuccessful] = useState(false)

  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const [errorMessage, setErrorMessage] = useState('')

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>()

  const onSubmit = async (data: { email: string }) => {
    axios
      .post(`${API_URL}/api/v1/find`, {
        data,
      })
      .then((res) => {
        if (res.status == 200) setIsEmailSuccessful(true)
      })
      .catch((error) => {
        if (error.statusText == 'Not Found')
          setErrorMessage('존재하지 않는 회원입니다.')
        else setErrorMessage('알 수 없는 오류가 발생했습니다.')
        openToast()
      })
  }

  return (
    <>
      <Box sx={Form}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}
        >
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
                  id="email"
                  placeholder="이메일을 입력하세요"
                  style={{ width: '100%' }}
                  disabled={isEmailSuccessful}
                />
                {errors.email && (
                  <Typography>{errors.email.message}</Typography>
                )}
              </Container>
            )}
          />
          {!isEmailSuccessful && (
            <Button type="submit" disabled={isSubmitting}>
              코드 발송
            </Button>
          )}
        </Box>
        {isEmailSuccessful && (
          <Box sx={{ display: 'flex', width: '100%' }}>
            <SendCodeForm
              email={
                control._fields.email ? control._fields.email._f.value : ''
              }
              setErrorMessage={setErrorMessage}
              openToast={openToast}
            />
          </Box>
        )}
      </Box>
      <CuToast open={isOpen} onClose={closeToast} severity="error">
        <Typography>{errorMessage}</Typography>
      </CuToast>
    </>
  )
}

export default SendEmailForm
