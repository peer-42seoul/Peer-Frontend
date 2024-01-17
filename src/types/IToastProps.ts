import { AlertColor } from '@mui/material/Alert'

interface IToast {
  severity: AlertColor | undefined
  message: React.ReactNode
}

export default IToast
