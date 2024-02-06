'use client'

import { Typography, Stack, CircularProgress } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import useAuthStore from '@/states/useAuthStore'

const OauthGoogleLogin = () => {
  const searchParams = useSearchParams()
  const state = searchParams.get('state')
  const code = searchParams.get('code')
  const scope = searchParams.get('scope')
  const authuser = searchParams.get('authuser')
  const prompt = searchParams.get('prompt')
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const { isLogin, accessToken } = useAuthStore()

  const handleConnect = () => {
    window.location.href = `${API_URL}/login/oauth2/code/google?state=${state}&code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}&accessToken=${accessToken}`
  }

  const handleLogin = () => {
    window.location.href = `${API_URL}/login/oauth2/code/google?state=${state}&code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`
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

export default OauthGoogleLogin
