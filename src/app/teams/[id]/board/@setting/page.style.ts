import { Theme } from '@mui/material'

export const mobilePage = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem 1rem 1rem 1rem',
  height: '50svh',
}

export const inputContainer = {
  background: (theme: Theme) => theme.palette.background.tertiary,
  padding: '0rem 0.75rem',
}
