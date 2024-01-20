import { useState } from 'react'
import CuToast from '@/components/CuToast'

const useToast = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('') // 토스트 알림에 표시할 메시지
  const openToast = () => setIsOpen(true)
  const closeToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setIsOpen(false)
  }

  return {
    CuToast,
    isOpen,
    openToast,
    closeToast,
    toastMessage,
    setToastMessage,
  }
}

export default useToast
