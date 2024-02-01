import { Theme } from '@mui/material'

const modal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '2rem',
  maxHeight: '70vh',
  backgroundColor: (theme: Theme) => theme.palette.background.primary,
}

export const mobileModal = {
  ...modal,
  width: '85vw',
  minWidth: '20.5rem',
  padding: '1.25rem 1.25rem 1.5rem 1.25rem',
}

export const pcModal = {
  ...modal,
  minWidth: '30rem',
  padding: '1.5rem 2rem',
}
