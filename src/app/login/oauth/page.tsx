'use client'

import { Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import useAuthStore from '@/states/useAuthStore'
import { setCookie } from 'cookies-next'

const OauthLogin = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuthStore()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    if (accessToken) {
      login(accessToken)
      setCookie('accessToken', accessToken)
      router.push('/')
    } else {
      window.alert('로그인에 실패했습니다')
      router.push('/login')
    }
  }, [])
  return <Typography>로그인 처리중...</Typography>
}

export default OauthLogin
