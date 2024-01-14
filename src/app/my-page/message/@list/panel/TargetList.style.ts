import { Theme } from '@mui/material'

export const targetList = {
  borderRadius: '0.25rem',
  maxHeight: '11rem',
  overflowY: 'scroll',
}

export const listItem = {
  borderRadius: '0.25rem',
}

export const listItemButton = {
  padding: '0.44rem 0.75rem',
  borderRadius: '0.25rem',
  '&:hover': {
    backgroundColor: (theme: Theme) => `${theme.palette.purple.tinted}`,
  },
}

export const avatar = {
  width: '2rem',
  height: '2rem',
}
