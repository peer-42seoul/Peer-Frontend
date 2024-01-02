import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'
import {
  SlideProps,
  Snackbar,
  Stack,
  SxProps,
  Typography,
  IconButton,
  Slide,
  useTheme,
} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import React from 'react'
import { CloseIcon } from '@/icons'
import useMedia from '@/hook/useMedia'

const hexToDecimalArray = (hex: string | undefined) => {
  if (!hex) {
    return [0, 0, 0]
  }
  hex = hex.replace(/^#/, '')

  const red = parseInt(hex.substring(0, 2), 16)
  const green = parseInt(hex.substring(2, 4), 16)
  const blue = parseInt(hex.substring(4, 6), 16)

  return [red, green, blue]
}

const calculateBlendedColor = (
  topColor: Array<number>,
  topAlpha: number,
  bottomColor: Array<number>,
) => {
  const resultColor = [
    Math.round(topColor[0] * topAlpha + bottomColor[0] * (1 - topAlpha)),
    Math.round(topColor[1] * topAlpha + bottomColor[1] * (1 - topAlpha)),
    Math.round(topColor[2] * topAlpha + bottomColor[2] * (1 - topAlpha)),
  ]

  return `rgb(${resultColor.join(', ')})`
}

const iconStyle: SxProps = {
  width: '0.75rem',
  height: '0.75rem',
  padding: '0.25rem',
  flexShrink: 0,
}

const toastPcStyle: SxProps = {
  padding: '1rem',
  height: 'auto',
  minHeight: '4rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.625rem',
  width: '100%',
  flex: '1 0 0',
  position: 'relative',
  borderRadius: '0.75rem',
  zIndex: 1600,
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

const toastMobileStyle: SxProps = {
  padding: 0,
  paddingLeft: '1.25rem',
  paddingRight: '0.5rem',
  height: 'auto',
  minHeight: '4rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0',
  width: '100%',
  maxWidth: '20.5rem',
  flex: '1 0 0',
  borderRadius: '0.5rem',
  position: 'relative',
  bottom: '3.25rem',
  boxSizing: 'border-box',
  '.MuiAlert-action': {
    marginLeft: '0',
    paddingLeft: '0',
  },
  '.MuiAlert-icon': {
    padding: '0',
    marginRight: '0.75rem',
  },
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    const { severity } = props
    let backgroundColor
    const theme = useTheme()

    if (severity === 'error') {
      backgroundColor = calculateBlendedColor(
        hexToDecimalArray(theme.palette.red.normal),
        0.2,
        hexToDecimalArray(theme.palette.background.primary),
      )
    } else if (severity === 'warning') {
      backgroundColor = calculateBlendedColor(
        hexToDecimalArray(theme.palette.yellow.normal),
        0.2,
        hexToDecimalArray(theme.palette.background.primary),
      )
    } else {
      backgroundColor = calculateBlendedColor(
        hexToDecimalArray(theme.palette.purple.normal),
        0.2,
        hexToDecimalArray(theme.palette.background.primary),
      )
    }
    const { isPc } = useMedia()
    const toastStyle: SxProps = isPc ? toastPcStyle : toastMobileStyle

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
  autoHideDuration = 60000,
  onClose,
  severity,
  message,
  subButton,
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
  subButton?: React.ReactNode
}) => {
  const { isPc } = useMedia()
  return (
    <Snackbar
      open={open}
      anchorOrigin={
        isPc
          ? { vertical: 'top', horizontal: 'center' }
          : { vertical: 'bottom', horizontal: 'left' }
      }
      autoHideDuration={autoHideDuration}
      // onClose={onClose}
      sx={{
        zIndex: 1600,
        paddingLeft: isPc ? '1.5rem' : '0.75rem',
        paddingRight: isPc ? '1.5rem' : '1rem',
        boxSizing: 'border-box',
        width: '100%',
        '.MuiSnackbar-anchorOriginBottomLeft': {
          bottom: '3.25rem',
        },
      }}
      TransitionComponent={TransitionLeft}
    >
      <Alert
        onClose={onClose}
        severity={severity === 'success' ? 'info' : severity}
        action={
          <Stack flexDirection={'row'} spacing={'0.5rem'} sx={{ padding: 0 }}>
            {subButton}
            <IconButton size="small" aria-label="close" onClick={onClose}>
              <CloseIcon
                sx={{
                  width: '1.5rem',
                  height: '1.5rem',
                  padding: 'calc(0.5rem - 5px)', // stack에 있는 기본 padding이 5px라서 5px를 빼줍니다.
                  paddingLeft: subButton ? '0.5rem' : 'calc(0.5rem - 5px)',
                  color: 'text.assistive', // CloseIcon의 코드 변경이 필요합니다.
                }}
              />
            </IconButton>
          </Stack>
        }
      >
        {/* 기존에는 타이포그래피를 넣게 하였으나 앞으로는 message prop에 넣는 것으로 처리해야 합니다.*/}
        <Typography variant="Body2">{message}</Typography>
      </Alert>
    </Snackbar>
  )
}

export default CuToast
