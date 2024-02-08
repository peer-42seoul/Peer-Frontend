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
    autoHideDuration: 3000,
    onClose: closeToast,
    severity: undefined,
    message: '',
    subButton: undefined,
  }
  // NOTE : 각각의 페이지에서 토스트를 커스텀 하였을 경우 useEffect의 return에서 setDefaultToastProps를 실행해주세요.
  const setDefaultToastProps = () => {
    set({ toastProps: { ...defaultToastProps, open: get().toastProps.open } })
  }

  return {
    toastProps: {
      open: false,
      autoHideDuration: 3000,
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
