import { styled } from '@mui/material/styles'
import { Switch, SwitchProps } from '@mui/material'

const CuDisplayModeToggle = styled((props: SwitchProps) => (
  <Switch disableRipple {...props} />
))(({ theme }) => ({
  width: 60,
  height: 28,
  padding: 0,
  display: 'flex',
  borderRadius: 50,
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 16,
      height: 16,
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 0,
    // margin: 2,
    width: 60,
    height: 28,
    position: 'relative',
    '&.Mui-checked': {
      transform: 'translateX(28px)',
      color: theme.palette.purple.tinted,
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.background.tertiary,
        '&:before, &:after': {
          content: '""',
          position: 'absolute',
          top: 2,
          transition: 'opacity 0.5s ease',
          width: 24,
          height: 24,
        },
        '&:before': {
          backgroundImage: `url('/images/sign_sun.svg')`,
          left: 6,
          top: 2,
          zIndex: 1,
          opacity: 1,
        },
        '&:after': {
          backgroundImage: `url('/images/sign_moon.svg')`,
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
    // boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 50,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
    backgroundColor: theme.palette.background.tertiary,
    borderWidth: 2,
    borderColor: theme.palette.purple.tinted,
    borderStyle: 'solid',
    position: 'absolute',
    top: 2,
    left: 4,
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
      backgroundImage: `url('/images/sign_sun.svg')`,
      left: 6,
      top: 2,
      zIndex: 1,
      opacity: 0,
    },
    '&:after': {
      backgroundImage: `url('/images/sign_moon.svg')`,
      right: 6,
      top: 2,
      zIndex: 1,
      opacity: 1,
    },
  },
}))

export default CuDisplayModeToggle
