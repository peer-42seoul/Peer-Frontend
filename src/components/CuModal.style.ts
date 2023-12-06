import { Theme } from '@mui/material'

const modalBase = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

export const pcWrapper = {
  ...modalBase,
  minWidth: '35rem',
  minHeight: '21.5rem',
  padding: '1.5rem 2rem',
  borderRadius: '2rem',
  backgroundColor: (theme: Theme) => theme.palette.background.primary,
}

export const mobileWrapper = {
  ...modalBase,
  minWidth: '20.5rem',
  borderRadius: '2rem',
  padding: '1.25rem 1.25rem 1.5rem 1.25rem',
  backgroundColor: (theme: Theme) => theme.palette.background.primary,
}

export const mobileFullSizeWrapper = {
  // ...modalBase,
  width: '100vw',
  height: '100svh',
  backgroundColor: (theme: Theme) => theme.palette.blue.alternative,
}

export const headerMobileButton = {
  width: '1.25rem',
  height: '1.25rem',
}

export const headerDummyButton = {
  width: '2.5rem',
  height: '2.5rem',
}

export const title = {
  padding: '0.375rem 0rem',
}

export const headerCloseButton = {
  ...headerMobileButton,
  color: (theme: Theme) => theme.palette.text.assistive,
}

export const textButton = {
  width: '50%',
}

export const containedButton = {
  width: '50%',
}
