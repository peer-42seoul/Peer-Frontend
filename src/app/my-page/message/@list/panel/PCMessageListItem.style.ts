import { Theme } from '@mui/material'

export const listItem = {
  padding: '0.625rem 1rem',
  marginBottom: '1rem',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: (theme: Theme) => theme.palette.line.alternative as string,
}

export const checkbox = { width: '1.5rem', height: '1.5rem' }
