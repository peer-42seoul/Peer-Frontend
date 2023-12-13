import { Theme } from '@mui/material'

export const pcBox = {
  padding: '1.5rem',
  borderRadius: '1rem',
  background: (theme: Theme) => theme.palette.background.primary,
}

export const mobileBox = {
  padding: '0.5rem 1rem 1rem 1rem',
  borderRadius: '1rem',
  background: (theme: Theme) => theme.palette.background.secondary,
}
