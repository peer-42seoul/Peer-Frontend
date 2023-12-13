import { Theme } from '@mui/material'

export const searchInputWrapper = {
  padding: '0 0.75rem',
  height: '2rem',
  maxWidth: '24.5rem',
  borderRadius: '0.25rem',
  backgroundColor: (theme: Theme) => theme.palette.background.tertiary,
}

export const searchInput = {
  '& .MuiInputBase-input::placeholder': {
    color: (theme: Theme) => theme.palette.text.alternative,
    fontSize: (theme: Theme) => theme.typography.Caption.fontSize,
    fontWeight: (theme: Theme) => theme.typography.Caption.fontWeight,
    lineHeight: (theme: Theme) => theme.typography.Caption.lineHeight,
  },
}
