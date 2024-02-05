'use client'

import React, { useEffect } from 'react'
import { Typography } from '@mui/material'
import SendEmailForm from './panel/SendEmailForm'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/states/useAuthStore'
import FindComplete from './panel/FindComplete'
import BoxBase from '@/components/BoxBase'
import { MobileLoginBox, PCLoginBox } from '../login/login.style'

const FindAccount = () => {
  const router = useRouter()
  const { isLogin } = useAuthStore()

  const [isCodeSuccessful, setIsCodeSuccessful] = React.useState<boolean>(false)

  useEffect(() => {
    if (isLogin) router.push('/')
  }, [isLogin])

  return (
    <BoxBase mobileSx={MobileLoginBox} pcSx={PCLoginBox}>
      {isCodeSuccessful ? (
        <FindComplete />
      ) : (
        <>
          <Typography variant="Title3Emphasis">비밀번호 찾기</Typography>
          <SendEmailForm setIsCodeSuccessful={setIsCodeSuccessful} />
        </>
      )}
    </BoxBase>
  )
}

export default FindAccount
