import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'
import { SlideProps, Snackbar, Stack, SxProps, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import React from 'react'
import { CloseIcon } from '@/icons'
import { IconButton } from '@mui/material'
import { Slide } from '@mui/material'

const iconStyle: SxProps = {
  width: '0.75rem',
  height: '0.75rem',
  padding: '0.25rem',
  flexShrink: 0,
}

const toastStyle: SxProps = {
  padding: '1rem',
  height: '4rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.625rem',
  width: '80vw',
  flex: '1 0 0',
  position: 'relative',
  borderRadius: '0.75rem',
  '.MuiAlert-action': {
    marginLeft: '0',
    position: 'absolute',
    right: '1rem',
  },
  '.MuiAlert-icon': {
    marginRight: '0',
    padding: '0',
  },
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    const { severity } = props
    let backgroundColor
    if (severity === 'error') {
      backgroundColor = 'red.tinted'
    } else if (severity === 'warning') {
      backgroundColor = 'yellow.tinted'
    } else if (severity === 'info') {
      backgroundColor = 'purple.tinted'
    }

    const customToastStyle: SxProps = {
      ...toastStyle,
      backgroundColor: backgroundColor,
    }

    return (
      <MuiAlert
        elevation={6}
        ref={ref}
        variant="filled"
        iconMapping={{
          error: <CircleIcon sx={{ ...iconStyle, color: 'red.strong' }} />,
          warning: <CircleIcon sx={{ ...iconStyle, color: 'yellow.strong' }} />,
          info: <CircleIcon sx={{ ...iconStyle, color: 'purple.strong' }} />,
        }}
        {...props}
        sx={customToastStyle}
      />
    )
  },
)

function TransitionLeft(props: SlideProps) {
  // 공식 문서 보면 left라고 적혀있는데, 그렇게 적용하면 오른쪽에서 나오길래 반대로 했습니다.
  return <Slide {...props} direction="right" />
}

const CuToast = ({
  open,
  autoHideDuration,
  onClose,
  severity,
  children,
  message,
  action,
}: {
  open: boolean
  autoHideDuration?: number
  onClose: (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => void | undefined
  severity?: AlertColor | undefined
  sx?: SxProps
  children?: React.ReactNode
  message?: string
  action?: React.ReactNode
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration ? autoHideDuration : 600000}
      onClose={onClose}
      sx={{ zIndex: 1600 }}
      TransitionComponent={TransitionLeft}
    >
      <Alert
        onClose={onClose}
        severity={severity === 'success' ? 'info' : severity}
        action={
          <Stack flexDirection={'row'} spacing={'0.5rem'}>
            {action}
            <IconButton size="small" aria-label="close" onClick={onClose}>
              <CloseIcon
                sx={{
                  width: '1.5rem',
                  height: '1.5rem',
                  color: 'text.assistive', // CloseIcon의 코드 변경이 필요합니다.
                }}
              />
            </IconButton>
          </Stack>
        }
      >
        <Typography variant="Body2">{message}</Typography>
        {children}
      </Alert>
    </Snackbar>
  )
}

export default CuToast
