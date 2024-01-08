'use client'
import React, { useEffect, useState } from 'react'
import NotifSetting from './panel/NotifSetting'
import DisplaySetting from './panel/DisplaySetting'
import KeywordSetting from './panel/KeywordSetting'
import useToast from '@/hook/useToast'
import { AlertColor } from '@mui/material/Alert'
import { Stack } from '@mui/material'
import * as style from '../panel/my-page.style'
import useMedia from '@/hook/useMedia'

interface IToast {
  severity: AlertColor | undefined
  message: React.ReactNode
}

const HomepageSetting = () => {
  const [toastMessage, setToastMessage] = useState({} as IToast)
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const { isPc } = useMedia()

  useEffect(() => {
    if (toastMessage.message) {
      if (isOpen) closeToast()
      openToast()
    }
  }, [toastMessage, openToast, isOpen, closeToast])

  const clearToast = () => {
    closeToast()
    setToastMessage((prev) => ({ ...prev, message: '' }))
  }
  const pageStyle = isPc ? style.pagePcStyle : style.pageMobileStyle

  return (
    <Stack
      sx={{ ...pageStyle, whiteSpace: 'pre-line', wordBreak: 'keep-all' }}
      spacing={isPc ? '2rem' : '1.5rem'}
    >
      <NotifSetting setToastMessage={setToastMessage} />
      <KeywordSetting setToastMessage={setToastMessage} />
      <DisplaySetting />
      <CuToast
        severity={toastMessage.severity}
        open={isOpen}
        onClose={clearToast}
        message={toastMessage.message}
      />
    </Stack>
  )
}

export default HomepageSetting
