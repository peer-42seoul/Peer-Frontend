import { useState } from 'react'
import CuToast from '@/components/CuToast'
import { AlertColor } from '@mui/material'

interface IToastData {
  severity: AlertColor
  message: string
}

const useToast = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [toastData, setToastData] = useState<IToastData>({
    severity: 'success',
    message: '',
  })
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
  // TODO : 이름 바꾸기;;;
  const openToastWithCustomData = (data: IToastData) => {
    setToastData(data)
    openToast()
  }

  return {
    CuToast,
    isOpen,
    openToast,
    closeToast,
    toastData,
    openToastWithCustomData,
  }
}

export default useToast
