'use client'

import React, { useState } from 'react'
import { Button, TextField, Typography, Container, Stack } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import useAdminStore from '@/states/useAdminStore'
// import { setCookie } from 'cookies-next'

const sheetSytle = {
  width: 'auto',
  height: 'auto',
  backgroundColor: 'background.secondary',
  padding: '2rem',
}

const LoginForm = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  // const [token, setToken] = useState('')
  const router = useRouter()
  const { login } = useAdminStore()

  let date = new Date()
  date.setTime(date.getTime() + 1 * 30 * 60 * 1000) // 현재 시간에서 0.5시간 뒤

  function onHandleLogin() {
    console.log('login')
    axios
      .post(
        `${API_URL}/api/v1/signin/admin`,
        {
          id: id,
          password: pw,
        },
        // { withCredentials: true },
      )
      .then(() => {
        login()
        router.push('/admin/tag')
      })
      .catch((err) => {
        if (
          err.response.status === 404 ||
          err.response.status === 401 ||
          err.response.status === 400
        ) {
          alert('아이디 또는 비밀번호가 존재하지 않거나 틀렸습니다.')
        } else alert('로그인 실패 ' + err)
      })
  }

  const onHandleChagneId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }

  const onHandleChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value)
  }

  return (
    <Container sx={sheetSytle}>
      <Stack gap={'1rem'}>
        <Typography variant="Title3" align="center">
          관리자 로그인
        </Typography>
        <Stack direction={'row'} justifyContent={'center'} columnGap={'0.5rem'}>
          <Stack>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              gap={'0.5rem'}
            >
              <Typography
                variant="Body1"
                display={'flex'}
                alignItems={'center'}
              >
                ID
              </Typography>
              <TextField value={id} onChange={onHandleChagneId} />
            </Stack>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              gap={'0.5rem'}
            >
              <Typography
                variant="Body1"
                display={'flex'}
                alignItems={'center'}
              >
                PW
              </Typography>
              <TextField value={pw} onChange={onHandleChangePw} />
            </Stack>
          </Stack>
          <Button variant="outlined" onClick={onHandleLogin}>
            로그인
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default LoginForm
