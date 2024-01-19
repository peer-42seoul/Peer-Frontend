import { SxProps } from '@mui/material'

export const cardContainerStyleBase: SxProps = {
  width: '100%',
  overflow: 'hidden',
  bottom: 0,
}

export const cardContainerPCStyle: SxProps = {
  ...cardContainerStyleBase,
  height: '100%',
  position: 'absolute',
  top: '2.75rem',
  left: '0px',
}

export const cardContainerMobileStyle: SxProps = {
  ...cardContainerStyleBase,
  height: '80svh',
}

export const gnbContainerStyle: SxProps = {
  height: '2.5rem',
  py: '0.38rem',
}
export const gnbTypographyStyle: SxProps = {
  color: 'text.normal',
  textAlign: 'center',
  fontFamily: 'Inter',
  fontSize: '13px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '150%',
  letterSpacing: '0.013px',
}

export const toggleContainerStyle: SxProps = {
  height: '1.75rem',
  width: '100%',
  py: '0.5rem',
  mb: '0.875rem',
}
