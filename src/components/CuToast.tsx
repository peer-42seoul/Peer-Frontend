import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'
import { Snackbar, SxProps } from '@mui/material'
import React from 'react'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  },
)

const CuToast = ({
  open,
  autoHideDuration,
  onClose,
  severity,
  sx,
  children,
}: {
  open: boolean
  autoHideDuration?: number
  onClose: (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => void | undefined
  severity?: AlertColor | undefined
  sx?: SxProps
  children: React.ReactNode
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration ? autoHideDuration : 6000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={sx ? sx : { width: '100%' }}
      >
        {children}
      </Alert>
    </Snackbar>
  )
}

export default CuToast
