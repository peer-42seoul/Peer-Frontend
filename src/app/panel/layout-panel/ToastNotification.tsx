'use client'
import CuToast from '@/components/CuToast'
import useToast from '@/states/useToast'
import React from 'react'

const ToastNotification = () => {
  const { toastProps } = useToast()

  // if (toastProps.severity === 'error') {
  //   return <CuToast {...toastProps} severity="error" />
  // } else if (toastProps.severity === 'warning') {
  //   return <CuToast {...toastProps} severity="warning" />
  // } else if (toastProps.severity === 'success') {
  //   return <CuToast {...toastProps} severity="success" />
  // } else {
  //   return <CuToast {...toastProps} severity="info" />
  // }

  return <CuToast {...toastProps} />
}

export default ToastNotification
