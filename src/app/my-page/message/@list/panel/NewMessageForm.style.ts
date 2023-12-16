import { Theme } from '@mui/material'

export const form = {
  padding: '1rem',
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
}
