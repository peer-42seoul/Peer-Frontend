'use client'

import { Typography, Stack, CircularProgress } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import useAuthStore from '@/states/useAuthStore'

const OauthFtLogin = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const API_URL = process.env.NEXT_PUBLIC_CSR_API
  const { isLogin, accessToken } = useAuthStore()

  const handleConnect = () => {
    window.location.href = `${API_URL}/login/oauth2/code/ft?code=${code}&state=${state}&accessToken=${accessToken}`
  }

  const handleLogin = () => {
    window.location.href = `${API_URL}/login/oauth2/code/ft?code=${code}&state=${state}`
  }

  useEffect(() => {
    if (isLogin) handleConnect()
    else handleLogin()
  }, [])
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography>소셜 계정 처리 중...</Typography>
    </Stack>
  )
}

export default OauthFtLogin
