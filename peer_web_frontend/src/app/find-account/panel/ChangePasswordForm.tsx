import React, { useState } from 'react'
import axios from 'axios'
import { Button, InputLabel, TextField } from '@mui/material'

const ChangePasswordForm = ({ token }: { token: string }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  // 비밀번호와 확인 비밀번호가 같은지 확인
  const checkPasswords = (password: string, confirmPassword: string) => {
    if (password === confirmPassword && password !== '') {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // 임시 주소로 요청
      const response = await axios.post(
        'https://localhost:/change-password',
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log('success', response.data)
    } catch (error) {
      console.error('Error', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <InputLabel htmlFor="password">새 비밀번호</InputLabel>
        <TextField
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            checkPasswords(confirmPassword, e.target.value)
          }}
        />
      </div>
      <div>
        <InputLabel htmlFor="confirmPassword">새 비밀번호 확인</InputLabel>
        <TextField
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            checkPasswords(password, e.target.value)
          }}
        />
      </div>
      <Button type="submit" disabled={!isButtonEnabled}>
        비밀번호 변경
      </Button>
    </form>
  )
}

export default ChangePasswordForm
