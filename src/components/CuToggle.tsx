import { styled } from '@mui/material/styles'
import { Switch, SwitchProps } from '@mui/material'

declare module '@mui/material' {
  interface SwitchProps {
    checkedtrackimage?: string // 체크된 토글 이미지
    uncheckedtrackimage?: string // 체크되지 않은 토글 이미지
  }
}

const CuToggle = styled((props: SwitchProps) => (
  <Switch disableRipple {...props} />
))(
  ({
    theme,
    checkedtrackimage = '/images/sign_on.svg',
    uncheckedtrackimage = '/images/sign_off.svg',
  }) => ({
    width: 60,
    height: 28,
    padding: 0,
    display: 'flex',
    borderRadius: 50,
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 16,
        height: 16,
        transition: 'transform 0.5s ease',
      },
    },
    '& .MuiSwitch-switchBase': {
      '&:hover': {
        backgroundColor: 'transparent',
      },

      padding: 0,
      // margin: 2,
      width: 60,
      height: 28,
      position: 'relative',
      transform: 'translateX(0px)',
      transition: 'transform 0.5s ease, border-color 0.5s ease',
      '&.Mui-checked': {
        transform: 'translateX(28px)',
        transition: 'transform 0.5s ease',
        color: theme.palette.purple.tinted,
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.background.tertiary,
          '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: 2,
            transition: 'opacity 0.3s ease',
            width: 24,
            height: 24,
          },
          '&:before': {
            backgroundImage: `url(${checkedtrackimage})`,
            left: 6,
            top: 2,
            zIndex: 1,
            opacity: 1,
          },
          '&:after': {
            backgroundImage: `url(${uncheckedtrackimage})`,
            right: 6,
            top: 2,
            zIndex: 1,
            opacity: 0,
          },
        },
        '& .MuiSwitch-thumb': {
          backgroundColor: theme.palette.purple.tinted,
          borderWidth: 2,
          borderColor: theme.palette.purple.strong,
          borderStyle: 'solid',
          width: 16,
          height: 16,
          position: 'absolute',
          top: 4,
          right: 6,
        },
      },
      '& .MuiSwitch-thumb': {
        left: 6,
        top: 4,
        width: 16,
        height: 16,
      },
      '& .MuiSwitch-input': {
        left: 0,
        top: 0,
        width: 60,
        height: 28,
        margin: 0,
        padding: 0,
        position: 'absolute',
      },
    },
    '& .MuiSwitch-thumb': {
      width: 16,
      height: 16,
      borderRadius: 50,
      backgroundColor: theme.palette.background.tertiary,
      borderWidth: 2,
      borderColor: theme.palette.purple.tinted,
      borderStyle: 'solid',
      position: 'absolute',
      top: 2,
      left: 4,
      transform: 'translateX(0px)',
      transition: 'transform 0.5s ease, borderColor 0.5s ease',
    },
    '& .MuiSwitch-track': {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 60,
      height: 28,
      borderRadius: 50,
      opacity: 1,
      backgroundColor: theme.palette.background.tertiary,
      color: theme.palette.background.tertiary,
      boxSizing: 'border-box',
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: 2,
        transition: 'opacity 0.5s ease',
        width: 24,
        height: 24,
      },
      '&:before': {
        backgroundImage: `url(${checkedtrackimage})`,
        left: 6,
        top: 2,
        zIndex: 1,
        opacity: 0,
      },
      '&:after': {
        backgroundImage: `url(${uncheckedtrackimage})`,
        right: 6,
        top: 2,
        zIndex: 1,
        opacity: 1,
      },
    },
  }),
)

export default CuToggle
