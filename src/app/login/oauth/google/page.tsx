'use client'

import { Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'
import axios from 'axios'

const OauthGoogleLogin = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = searchParams.get('state')
  const code = searchParams.get('code')
  const scope = searchParams.get('scope')
  const authuser = searchParams.get('authuser')
  const prompt = searchParams.get('prompt')
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const { isLogin } = useAuthStore()
  const axiosWithAuth = useAxiosWithAuth()

  const handleConnect = async () => {
    try {
      const response = await axiosWithAuth.get('/login/oauth2/code/google', {
        params: {
          state: state,
          code: code,
          scope: scope,
          authuser: authuser,
          prompt: prompt,
        },
      })
      if (response.status == 200) {
        router.push('/my-page/privacy')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleLogin = async () => {
    try {
      await axios.get(`${API_URL}/login/oauth2/code/google`, {
        params: {
          code: code,
          state: state,
        },
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    if (isLogin) handleConnect()
    else handleLogin()
  }, [])
  return <Typography>소셜 계정 처리중...</Typography>
}

export default OauthGoogleLogin
