import { Theme } from '@mui/material'

export const searchInput = {
  padding: '0.25rem 0.75rem',
  backgroundColor: (theme: Theme) => theme.palette.background.tertiary,
}

export const searchIcon = {
  width: '1.25rem',
  height: '1.25rem',
}

export const inputBase = {
  '& .MuiInputBase-input::placeholder': {
    color: (theme: Theme) => theme.palette.text.alternative,
    fontSize: (theme: Theme) => theme.typography.Caption.fontSize,
    fontWeight: (theme: Theme) => theme.typography.Caption.fontWeight,
    lineHeight: (theme: Theme) => theme.typography.Caption.lineHeight,
  },
}
