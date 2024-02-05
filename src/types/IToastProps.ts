import { SxProps } from '@mui/material'
import { AlertColor } from '@mui/material/Alert'

interface IToast {
  severity: AlertColor | undefined
  message: React.ReactNode
}

export interface IToastProps {
  open: boolean
  autoHideDuration?: number
  onClose: (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => void | undefined
  severity?: AlertColor | undefined
  sx?: SxProps
  children?: React.ReactNode
  message?: React.ReactNode
  subButton?: React.ReactNode
}

export default IToast
