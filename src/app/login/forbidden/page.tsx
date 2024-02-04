'use client'
import { CircularProgress, Typography, Stack } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import useToast from '@/states/useToast'
import { useRouter } from 'next/navigation'

const LoginForbidden = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const { openToast } = useToast()
  const router = useRouter()

  const handleForbidden = () => {
    if (code === 'blocked') {
      openToast({
        message: '차단된 계정입니다. 관리자에게 문의하세요.',
        severity: 'error',
      })
      router.push('/login')
    } else if (code === 'already_link') {
      openToast({
        message: '이미 연동이 완료된 소셜계정입니다.',
        severity: 'error',
      })
      router.push('/my-page')
    } else if (code === 'duplicate') {
      openToast({
        message: '이미 이 계정으로 연동되어 있습니다.',
        severity: 'error',
      })
      router.push('/my-page')
    } else if (code === 'failed') {
      openToast({
        message: '소셜 로그인에 문제가 발생했습니다.',
        severity: 'error',
      })
      router.push('/login')
    }
  }

  useEffect(() => {
    handleForbidden()
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
      <Typography>계정 처리 중...</Typography>
    </Stack>
  )
}

export default LoginForbidden
