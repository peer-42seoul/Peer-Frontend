'use client'

import { Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import useAuthStore from '@/states/useAuthStore'

const OauthLogin = () => {
  const [cookies, setCookie] = useCookies(['refreshToken'])
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuthStore()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = cookies.refreshToken
    if (accessToken && refreshToken) {
      login(accessToken)
      setCookie('refreshToken', refreshToken, { path: '/' })
      router.push('/')
    } else {
      window.alert('로그인에 실패했습니다')
      router.push('/login')
    }
  }, [])
  return <Typography>로그인 처리중...</Typography>
}

export default OauthLogin
