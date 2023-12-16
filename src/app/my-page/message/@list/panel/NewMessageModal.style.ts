import { Theme } from '@mui/material'

const MODAL_ZINDEX = 1400

export const searchInput = {
  padding: '0.25rem 0.75rem',
  borderRadius: '0.25rem',
  backgroundColor: (theme: Theme) => theme.palette.background.tertiary,
}

export const searchIcon = {
  width: '1.25rem',
  height: '1.25rem',
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
    '-webkit-text-fill-color': (theme: Theme) => theme.palette.text.normal,
  },
}

export const targetListPopper = {
  zIndex: MODAL_ZINDEX,
  borderRadius: '0.25rem',
  backgroundColor: (theme: Theme) => `${theme.palette.background.tertiary}`,
}
