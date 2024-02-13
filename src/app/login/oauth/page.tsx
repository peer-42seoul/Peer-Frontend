'use client'

import { Typography, Stack, CircularProgress } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import useAuthStore from '@/states/useAuthStore'

const OauthLogin = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuthStore()
  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    if (accessToken) {
      login(accessToken)
      router.push('/')
    } else {
      window.alert('로그인에 실패했습니다')
      router.push('/login')
    }
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
      <Typography>로그인 처리 중...</Typography>
    </Stack>
  )
}

export default OauthLogin
