'use client'

import { TextField, Typography, Button, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'

const SendCodeForm = ({
  email,
  setPasswordToken,
}: {
  email: string
  setPasswordToken: (newValue: string) => void
}) => {
  const [code, setCode] = useState('')
  const [isAuthing, setIsAuthing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthing(true)
    const jsonData = JSON.stringify({ email, code })
    console.log(jsonData)

    try {
      // 테스트용 post요청 코드
      const res = await axios.post(`http://localhost:5000/password_change`, {
        jsonData,
      })
      console.log(res)
      // 임의
      setPasswordToken(res.data.token)
    } catch (error) {
      console.log(error)
      // 테스트용 임시 코드 (추후삭제)
      console.log('setToken!')
      setPasswordToken('1234')
    }
    setIsAuthing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel htmlFor="auth-code">인증코드</InputLabel>
      <Typography>이메일로 전송된 인증코드를 입력해주세요.</Typography>
      <TextField
        type="text"
        name="auth-code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button type="submit" disabled={isAuthing}>
        인증코드 확인
      </Button>
    </form>
  )
}

export default SendCodeForm
