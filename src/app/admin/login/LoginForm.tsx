'use client'

import React, { useState } from 'react'
import { Button, TextField, Typography, Container, Stack } from '@mui/material'
import axios from 'axios'
import useAdminStore from '@/states/useAdminStore'
import { config } from '../panel/AdminAxios'

const LoginForm = () => {
  const API_URL = process.env.NEXT_PUBLIC_CSR_API
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const { login } = useAdminStore()

  function onHandleLogin() {
    axios
      .post(
        `${API_URL}/api/v1/signin/admin`,
        {
          id: id,
          password: pw,
        },
        config,
      )
      .then(() => {
        login()
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

  const onHandleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onHandleLogin()
  }

  return (
    <Container
      sx={{
        width: 'auto',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Stack
        gap={'1rem'}
        sx={{
          padding: '2rem',
          backgroundColor: 'background.secondary',
          borderRadius: '0.5rem',
        }}
      >
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
              <TextField
                value={id}
                onChange={onHandleChagneId}
                autoFocus={true}
                onKeyDown={onHandleKeyPress}
              />
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
              <TextField
                value={pw}
                onChange={onHandleChangePw}
                onKeyDown={onHandleKeyPress}
              />
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
