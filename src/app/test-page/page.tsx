'use client'
import useToast from '@/hook/useToast'
import { AlertColor, Button } from '@mui/material'
import React, { useState } from 'react'

const Page = () => {
  const {
    CuToast,
    isOpen,
    openToast,
    closeToast,
    toastMessage,
    setToastMessage,
  } = useToast()

  const handleInfo = () => {
    setToastMessage('정보')
    setSeverity('info')
    openToast()
  }

  const handleError = () => {
    setToastMessage('에러')
    setSeverity('error')
    openToast()
  }

  const handleWarning = () => {
    setToastMessage('경고')
    setSeverity('warning')
    openToast()
  }

  const [severity, setSeverity] = useState<AlertColor>('info')
  return (
    <div>
      <Button onClick={handleInfo} color="primary">
        info
      </Button>
      <Button onClick={handleError} color="error">
        error
      </Button>
      <Button onClick={handleWarning} color="warning">
        warning
      </Button>
      <CuToast
        open={isOpen}
        onClose={closeToast}
        severity={severity}
        message={toastMessage}
      />
    </div>
  )
}

export default Page
