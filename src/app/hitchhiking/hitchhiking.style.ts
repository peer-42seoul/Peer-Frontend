import { SxProps } from '@mui/material'

export const phoneStyle: SxProps = {
  width: 'calc(80svh * 360 /800)',
  maxWidth: '22.5rem',
  height: '80vh',
  maxHeight: '50rem',
  borderColor: 'text.normal',
  borderStyle: 'solid',
  borderWidth: 2,
  borderRadius: '3rem',
  p: 1,
  position: 'relative',
  overflow: 'hidden',
}

export const phoneStatusBarStyle: SxProps = {
  width: '100%',
  height: '1.5rem',
  position: 'absolute',
  top: '1.5rem',
  left: 0,
}

export const buttonContainerStyle: SxProps = {
  width: '3rem',
  py: '5rem',
}

export const buttonStyle: SxProps = {
  backgroundColor: 'background.tertiary',
  borderRadius: '50px',
  padding: '0.5rem',
  width: 'calc(80svh * 48 / 800)',
  height: 'calc(80svh * 48 / 800)',
  maxWidth: '3rem',
  maxHeight: '3rem',
}

export const buttonIconStyle: SxProps = {
  width: 'calc(80svh * 24 / 800)',
  height: 'calc(80svh * 24 / 800)',
  maxWidth: '1.5rem',
  maxHeight: '1.5rem',
}
