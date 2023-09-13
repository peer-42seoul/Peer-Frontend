'use client'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import SendCodeForm from './SendCodeForm'
import axios from 'axios'
import { InputLabel, TextField, Typography, Button } from '@mui/material'

const SendEmailForm = () => {
  const [email, setEmail] = useState('')
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<{ email: string }>()

  const onSubmit = (data) => {
    console.log(data)
    // 테스트용 post요청 코드
    axios
      .post(`http://localhost:5000/find`, {
        data,
      })
      .then((res) => {
        console.log(res)
        // 로그인 상태 관리 로직
        setEmail(data.email)
      })
      .catch((error) => {
        console.log(error.message)
      })
    console.log('isSubmitting:', isSubmitting)
    console.log('isSubmitSuccess:', isSubmitSuccessful)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
              <div>
                <InputLabel htmlFor="email">이메일:</InputLabel>
                <TextField
                  {...field}
                  type="email"
                  id="email"
                  placeholder="이메일을 입력하세요"
                />
              </div>
            )}
          />
          {errors.email && <Typography>{errors.email.message}</Typography>}
        </div>
        {!isSubmitSuccessful ? (
          <Button type="submit" disabled={isSubmitting}>
            인증메일 전송
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            인증메일 재전송
          </Button>
        )}
      </form>
      {isSubmitSuccessful && <SendCodeForm email={email} />}
    </div>
  )
}

export default SendEmailForm
