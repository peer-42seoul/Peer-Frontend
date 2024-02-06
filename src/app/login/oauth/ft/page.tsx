'use client'

import { Typography } from '@mui/material'
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
  return <Typography>소셜 계정 처리중...</Typography>
}

export default OauthFtLogin
