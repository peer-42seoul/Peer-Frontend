'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Typography } from '@mui/material'

const CodeTimer = ({
  setEmailSendStatus,
}: {
  setEmailSendStatus: Dispatch<SetStateAction<'before' | 'submit' | 'error'>>
}) => {
  const [timer, setTimer] = useState(5)

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1)
    }, 1000)

    return () => {
      clearInterval(countdown)
    }
  }, [])

  useEffect(() => {
    if (timer === 0) {
      alert('인증 코드가 만료되었습니다.')
      setEmailSendStatus('before')
    }
  }, [timer, setEmailSendStatus])

  return (
    <>
      <Typography>{`${Math.floor(timer / 60)}:${(timer % 60)
        .toString()
        .padStart(2, '0')}`}</Typography>
    </>
  )
}

export default CodeTimer
