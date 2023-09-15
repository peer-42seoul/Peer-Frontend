'use client'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import SendCodeForm from './SendCodeForm'
import axios from 'axios'
import { InputLabel, TextField, Typography, Button } from '@mui/material'

const SendEmailForm = ({
  setPasswordToken,
}: {
  setPasswordToken: (newValue: string) => void
}) => {
  const [email, setEmail] = useState('')
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
      const res = await axios.post(`http://localhost:5000/find`, {
        data,
      })
      console.log(res)

      setEmail(data.email)
      setIsEmailSuccessful(true)
    } catch (error) {
      console.log(error)
      // 테스트 용 (추후 삭제)
      setIsEmailSuccessful(true)
    }
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
        {!isEmailSuccessful ? (
          <Button type="submit" disabled={isSubmitting}>
            인증메일 전송
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            인증메일 재전송
          </Button>
        )}
      </form>
      {isEmailSuccessful && (
        <SendCodeForm email={email} setPasswordToken={setPasswordToken} />
      )}
    </div>
  )
}

export default SendEmailForm
