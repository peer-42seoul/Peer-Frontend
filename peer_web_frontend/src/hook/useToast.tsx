import { useState } from 'react'
import CuToast from '@/components/CuToast'

const useToast = () => {
  const [isOpen, setIsOpen] = useState(false)
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

  return { CuToast, isOpen, openToast, closeToast }
}

export default useToast
