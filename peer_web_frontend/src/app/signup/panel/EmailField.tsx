'use client'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import { InputLabel, TextField, Button, Typography } from '@mui/material'

const EmailField = ({
  control,
  error,
  getValues,
}: {
  control: any
  error: any
  getValues: any
}) => {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const rules = {
    required: '이메일을 입력해주세요',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: '유효한 이메일 형식이 아닙니다',
    },
  }
  const API_URL = 'http://localhost:4000'
  const submitEmail = () => {
    const email = getValues('email')
    if (!email) return
    console.log(email)
    axios
      .post(`${API_URL}/email`, {
        email: email,
      })
      .then((res) => {
        console.log(res)
        setIsEmailSent(true)
        setIsValidEmail(true)
      })
      .catch((error) => {
        console.log(error)
        setIsEmailSent(true)
        setIsValidEmail(false)
      })
  }
  return (
    <>
      <Controller
        name="email"
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <InputLabel>이메일</InputLabel>
            <TextField {...field} type="text" />
            <Button onClick={submitEmail}>이메일 인증</Button>
            {isEmailSent && isValidEmail && (
              <>
                <TextField />
                <Button onClick={() => {}}>인증코드 인증</Button>
              </>
            )}
          </>
        )}
      />
      {error && <Typography>{error.message}</Typography>}
    </>
  )
}

export default EmailField
