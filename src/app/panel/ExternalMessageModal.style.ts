import { Theme } from '@mui/material'

export const pcContainer = {
  width: '31rem',
}

export const mobileContainer = {
  width: '100%',
  height: '100%',
}

export const subTitle = {
  height: '1.5rem',
  lineHeight: '1.5rem',
}

export const inputBase = {
  '& .MuiInputBase-input::placeholder': {
    color: (theme: Theme) => theme.palette.text.alternative,
    fontSize: (theme: Theme) => theme.typography.Caption.fontSize,
    fontWeight: (theme: Theme) => theme.typography.Caption.fontWeight,
    lineHeight: (theme: Theme) => theme.typography.Caption.lineHeight,
  },
  '& .MuiInputBase-input.Mui-disabled': {
    color: (theme: Theme) => theme.palette.text.normal,
    WebkitTextFillColor: (theme: Theme) => theme.palette.text.normal,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}

export const form = {
  borderRadius: '0.25rem',
  background: (theme: Theme) => theme.palette.background.tertiary,
}

export const input = {
  height: '13rem',
  alignItems: 'flex-start',
  '& .MuiInputBase-input::placeholder': {
    color: (theme: Theme) => theme.palette.text.alternative,
    fontSize: (theme: Theme) => theme.typography.Caption.fontSize,
    fontWeight: (theme: Theme) => theme.typography.Caption.fontWeight,
    lineHeight: (theme: Theme) => theme.typography.Caption.lineHeight,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  overflow: 'scroll',
}
