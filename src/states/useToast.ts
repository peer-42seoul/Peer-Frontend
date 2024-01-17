import { IToastProps } from '@/types/IToastProps'
import { AlertColor } from '@mui/material'
import { create } from 'zustand'

interface IToastState {
  toastProps: IToastProps
  setToastMessage: ({
    message,
    severity,
  }: {
    message: string
    severity: AlertColor
  }) => void
  openToast: () => void
  closeToast: (event?: React.SyntheticEvent | Event, reason?: string) => void
  setAutoHideDuration: (duration: number) => void
  setSubButton: (subButton: React.ReactNode) => void
  setDefaultToastProps: () => void
}

const useToast = create<IToastState>((set, get) => {
  const setToastMessage = ({
    message,
    severity,
  }: {
    message: string
    severity: AlertColor
  }) => {
    set({ toastProps: { ...get().toastProps, message, severity } })
  }

  const openToast = () => {
    set({ toastProps: { ...get().toastProps, open: true } })
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
    toastProps: defaultToastProps,
    setToastMessage,
    openToast,
    closeToast,
    setAutoHideDuration,
    setSubButton,
    setDefaultToastProps,
  }
})

export default useToast
