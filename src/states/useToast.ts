import { IToastProps } from '@/types/IToastProps'
import { AlertColor } from '@mui/material'
import { create } from 'zustand'

interface IToastState {
  toastProps: IToastProps
  openToast: ({
    severity,
    message,
  }: {
    severity: AlertColor
    message: React.ReactNode
  }) => void
  closeToast: (event?: React.SyntheticEvent | Event, reason?: string) => void
  setAutoHideDuration: (duration: number) => void
  setSubButton: (subButton: React.ReactNode) => void
  setDefaultToastProps: () => void
}

const useToast = create<IToastState>((set, get) => {
  const openToast = ({
    severity,
    message,
  }: {
    severity: AlertColor
    message: React.ReactNode
  }) => {
    set({ toastProps: { ...get().toastProps, open: true, message, severity } })
  }

  const closeToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    set({ toastProps: { ...get().toastProps, open: false } })
  }

  const setAutoHideDuration = (duration: number) => {
    set({ toastProps: { ...get().toastProps, autoHideDuration: duration } })
  }

  const setSubButton = (subButton: React.ReactNode) => {
    set({ toastProps: { ...get().toastProps, subButton } })
  }

  const defaultToastProps: IToastProps = {
    open: false,
    autoHideDuration: 10000,
    onClose: closeToast,
    severity: undefined,
    message: '',
    subButton: undefined,
  }

  const setDefaultToastProps = () => {
    set({ toastProps: defaultToastProps })
  }

  return {
    toastProps: {
      open: false,
      autoHideDuration: 10000,
      onClose: closeToast,
      severity: undefined,
      message: '',
      subButton: undefined,
    },
    openToast,
    closeToast,
    setAutoHideDuration,
    setSubButton,
    setDefaultToastProps,
  }
})

export default useToast
