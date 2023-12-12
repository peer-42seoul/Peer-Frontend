import { Theme } from '@mui/material'

export const removeBorder = {
  minHeight: '5.625rem',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}

export const pcMessageForm = {
  width: '100%',
  flexGrow: 1,
  paddingRight: '0.5rem',
}

export const pcTextFieldContainer = {
  width: '100%',
  padding: '1rem',
  borderRadius: '0.25rem',
  backgroundColor: (theme: Theme) => theme.palette.background.tertiary,
}

export const pcTextField = {
  height: '5.625rem',
}

export const messageLength = {
  fontSize: '0.6875rem',
  fontWeight: 600,
  flexBasis: '3.5rem',
  textAlign: 'center',
}

export const pcSendButton = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3rem',
  height: '3rem',
  padding: '0.5rem',
  borderRadius: '50%',
  backgroundColor: (theme: Theme) => theme.palette.purple.strong,
}

export const mobileMessageForm = {
  // width: '100%',
  // height: '100%',
  flexGrow: 1,
  padding: '0.75rem',
}
