import { Theme } from '@mui/material'

const modalBase = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

export const pcWrapper = {
  ...modalBase,
  minWidth: '30rem',
  minHeight: '21.5rem',
  padding: '1.5rem 2rem',
  borderRadius: '2rem',
  maxHeight: '70vh',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  backgroundColor: (theme: Theme) => theme.palette.background.primary,
}

export const mobileWrapper = {
  ...modalBase,
  width: '85vw',
  minWidth: '20.5rem',
  borderRadius: '2rem',
  padding: '1.25rem 1.25rem 1.5rem 1.25rem',
  maxHeight: '70vh',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  backgroundColor: (theme: Theme) => theme.palette.background.primary,
}

export const mobileFullSizeWrapper = {
  boxSizing: 'border-box' as 'border-box',
  width: '100vw',
  height: '100svh',
  padding: '0.44rem 1rem 1rem 1rem',
  backgroundColor: (theme: Theme) => theme.palette.background.primary,
  overflowY: 'scroll',
}

export const modalContent = {
  flexGrow: 1,
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

const modalButtonBase = {
  padding: '0.75rem 1rem',
}

const modalButtonTypoBase = {
  fontSize: (theme: Theme) => theme.typography.Body1Emphasis.fontSize,
  fontStyle: (theme: Theme) => theme.typography.Body1Emphasis.fontStyle,
  fontWeight: (theme: Theme) => theme.typography.Body1Emphasis.fontWeight,
  lineHeight: (theme: Theme) => theme.typography.Body1Emphasis.lineHeight,
}

export const textButton = {
  ...modalButtonBase,
}

export const textButtonTypo = {
  ...modalButtonTypoBase,
  color: (theme: Theme) => theme.palette.purple.strong,
}

export const containedButton = {
  ...modalButtonBase,
}

export const containedButtonTypo = {
  ...modalButtonTypoBase,
  color: (theme: Theme) => theme.palette.text.normal,
}
