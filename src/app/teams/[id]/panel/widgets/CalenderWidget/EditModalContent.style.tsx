import { Theme } from '@mui/material'

export const selectInput = {
  padding: '0rem 0.75rem',
  borderRadius: '0.25rem',
  fontSize: (theme: Theme) => theme.typography.body2.fontSize,
  backgroundColor: (theme: Theme) => theme.palette.background.tertiary,
}
