import { Theme } from '@mui/material'

export const pcWrapper = {
  minWidth: '35rem',
  minHeight: '21.5rem',
  padding: '1.5rem 2rem',
  borderRadius: '2rem',
  backgroundColor: (theme: Theme) => theme.palette.background.primary,
}

export const mobileWrapper = {
  minWidth: '20.5rem',
  borderRadius: '2rem',
  padding: '1.25rem 1.25rem 1.5rem 1.25rem',
  backgroundColor: (theme: Theme) => theme.palette.background.primary,
}

export const mobileFullSizeWrapper = {
  width: '100vw',
  height: '100svh',
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
