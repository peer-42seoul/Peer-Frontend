import { AlertColor } from '@mui/material/Alert'

interface IToast {
  severity: AlertColor | undefined
  message: string
}

export default IToast
