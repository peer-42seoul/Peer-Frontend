'use client'

import { TextField, Typography, Button, InputLabel } from '@mui/material'
import React, { useState } from 'react'

const SendCodeForm = ({ email }: { email: string }) => {
  const [code, setCode] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const jsonData = JSON.stringify({ email, code })
    console.log(jsonData)
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
      <Button type="submit">인증코드 확인</Button>
    </form>
  )
}

export default SendCodeForm
