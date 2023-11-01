'use client'

import React, { useEffect } from 'react'
import { Typography, Container, IconButton, Box } from '@mui/material'
import SendEmailForm from './panel/SendEmailForm'
import useMedia from '@/hook/useMedia'
import { NavigateBefore } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/states/useAuthStore'

const PCBase = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '80px',
}

const MobileBase = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px 0 0 0',
}

const PCBox = {
  display: 'flex',
  position: 'relative',
  width: '496px',
  padding: '24px 24px 40px 24px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '48px',
  borderRadius: '16px',
  border: '1px solid #000',
}

const MobileBox = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 16px 15px 16px',
}

const FindAccount = () => {
  const { isPc } = useMedia()
  const router = useRouter()
  const { isLogin } = useAuthStore()

  useEffect(() => {
    if (isLogin) router.push('/')
  }, [isLogin])

  return (
    <Container sx={isPc ? PCBase : MobileBase}>
      <Container sx={isPc ? PCBox : MobileBox}>
        {isPc ? (
          <Typography>비밀번호 찾기</Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <IconButton
              sx={{ width: '40px', height: '40px' }}
              onClick={() => router.back()}
            >
              <NavigateBefore />
            </IconButton>
            <Typography>비밀번호 찾기</Typography>
            <IconButton sx={{ width: '40px', height: '40px' }} disabled />
          </Box>
        )}
        <SendEmailForm />
      </Container>
    </Container>
  )
}

export default FindAccount
