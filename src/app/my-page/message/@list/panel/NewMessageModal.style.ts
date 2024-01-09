import { Theme } from '@mui/material'

const MODAL_ZINDEX = 1400

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

export const searchInput = {
  padding: '0.25rem 0.75rem',
  borderRadius: '0.25rem',
  backgroundColor: (theme: Theme) => theme.palette.background.tertiary,
}

export const searchIcon = {
  width: '1.25rem',
  height: '1.25rem',
  color: 'text.normal',
}

export const closeIcon = {
  width: '1rem',
  height: '1rem',
  color: (theme: Theme) => theme.palette.text.alternative,
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
}

const popperBase = {
  zIndex: MODAL_ZINDEX,
  boxSizing: 'border-box',
  padding: '0.5rem',
  borderRadius: '0.25rem',
  backgroundColor: 'background.secondary',
}

export const pcPopper = {
  ...popperBase,
  width: '31rem',
}

export const mobilePopper = {
  ...popperBase,
  width: 'calc(100vw - 2rem)',
}
