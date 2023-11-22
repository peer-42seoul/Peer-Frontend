'use client'

import React, { useEffect } from 'react'
import { Typography } from '@mui/material'
import SendEmailForm from './panel/SendEmailForm'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/states/useAuthStore'
import FindComplete from './panel/FindComplete'
import BoxBase from '@/components/BoxBase'

const PCAccountBox = {
  display: 'flex',
  position: 'relative',
  width: '544px',
  padding: '40px 64px 140px 64px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '48px',
}

const MobileAccountBox = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 16px',
  gap: '24px',
}

const FindAccount = () => {
  const router = useRouter()
  const { isLogin } = useAuthStore()

  const [isCodeSuccessful, setIsCodeSuccessful] = React.useState<boolean>(false)

  useEffect(() => {
    if (isLogin) router.push('/')
  }, [isLogin])

  return (
    <BoxBase mobileSx={MobileAccountBox} pcSx={PCAccountBox}>
      {isCodeSuccessful ? (
        <FindComplete />
      ) : (
        <>
          <Typography>비밀번호 찾기</Typography>
          <SendEmailForm setIsCodeSuccessful={setIsCodeSuccessful} />
        </>
      )}
    </BoxBase>
  )
}

export default FindAccount
