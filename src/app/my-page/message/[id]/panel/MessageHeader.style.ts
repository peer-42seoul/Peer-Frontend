import { Theme } from '@mui/material'

export const pcHeader = {
  padding: '0.625rem 1rem',
  'border-bottom': (theme: Theme) =>
    `1px solid ${theme.palette.line.alternative}`,
}

export const headerAvatar = {
  width: '2rem',
  height: '2rem',
}
