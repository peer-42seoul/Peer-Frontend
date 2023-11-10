'use client'

import { Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import useAuthStore from '@/states/useAuthStore'
import axios from 'axios'

const OauthLogin = () => {
  const [cookies] = useCookies(['refreshToken'])
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuthStore()

  const getCookie = () => {
    axios.get('/login/oauth', { withCredentials: true }).then((res) => {
      console.log(res)
    })
    const refreshToken = cookies.refreshToken
    console.log('refreshToken?', refreshToken)
    // setCookie('refreshToken', refreshToken, { path: '/' })
  }

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    // 쿠키 받기
    getCookie()
    if (accessToken) {
      login(accessToken)
      router.push('/')
    } else {
      window.alert('로그인에 실패했습니다')
      router.push('/login')
    }
  }, [])
  return <Typography>로그인 처리중...</Typography>
}

export default OauthLogin
