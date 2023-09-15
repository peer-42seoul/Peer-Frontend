'use client'

import React, { useEffect, useState } from 'react'
import SendEmailForm from './panel/SendEmailForm'
import ChangePasswordForm from './panel/ChangePasswordForm'

const FindAccount = () => {
  const [passwordToken, setPasswordToken] = useState('')
  const [passwordForm, setPasswordForm] = useState(false)

  useEffect(() => {
    if (passwordToken !== '') setPasswordForm(true)
  }, [passwordToken])

  return (
    <>
      {!passwordForm ? (
        <SendEmailForm setPasswordToken={setPasswordToken} />
      ) : (
        <ChangePasswordForm token={passwordToken} />
      )}
    </>
  )
}

export default FindAccount
