'use client'
import CuToast from '@/components/CuToast'
import useToast from '@/states/useToast'
import React from 'react'

const ToastNotification = () => {
  const { toastProps } = useToast()

  return <CuToast {...toastProps} />
}

export default ToastNotification
