'use client'
import React, { useEffect, useState } from 'react'
import NotifSetting from './panel/NotifSetting'
import DisplaySetting from './panel/DisplaySetting'
import KeywordSetting from './panel/KeywordSetting'
import useToast from '@/hook/useToast'
import { AlertColor } from '@mui/material/Alert'

interface IToast {
  severity: AlertColor | undefined
  message: string
}

const HomepageSetting = () => {
  const [toastMessage, setToastMessage] = useState({} as IToast)
  const { CuToast, isOpen, openToast, closeToast } = useToast()

  useEffect(() => {
    if (toastMessage.message) {
      if (isOpen) closeToast()
      openToast()
    }
  }, [toastMessage, openToast, isOpen, closeToast])

  const clearToast = () => {
    setToastMessage((prev) => ({ ...prev, message: '' }))
    closeToast()
  }

  return (
    <div>
      <NotifSetting setToastMessage={setToastMessage} />
      <KeywordSetting setToastMessage={setToastMessage} />
      <DisplaySetting />
      <CuToast
        severity={toastMessage.severity}
        open={isOpen}
        onClose={clearToast}
      >
        {toastMessage.message}
      </CuToast>
    </div>
  )
}

export default HomepageSetting
