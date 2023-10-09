'use client'

import { TextField, Typography, Button, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const SendCodeForm = ({ email }: { email: string }) => {
  const [code, setCode] = useState('')
  const [isAuthing, setIsAuthing] = useState(false)
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
      region.reload() // 페이지 새로고침
    }
  }, [timer])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthing(true)
    const codeData = JSON.stringify({ email, code })
    console.log(codeData)

    try {
      // 테스트용 post요청 코드
      const res = await axios.post(`https://localhost:8080/password_change`, {
        codeData,
      })
      console.log(res)
      // 추후 모달로 변경
      alert(
        '메일로 임시 비밀번호가 전송되었습니다. 로그인 페이지로 이동합니다.',
      )
      router.push('/login')
    } catch (error) {
      console.log(error)
      alert('인증 코드가 일치하지 않습니다.')
    }
    setIsAuthing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel htmlFor="auth-code">인증코드</InputLabel>
      <Typography>이메일로 전송된 인증코드를 입력해주세요.</Typography>
      {timer > 0 && (
        <Typography>{`남은 시간: ${Math.floor(timer / 60)}분 ${
          timer % 60
        }초`}</Typography>
      )}
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
