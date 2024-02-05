import { SxProps } from '@mui/material'

export const cardContainerStyle: SxProps = {
  width: '100%',
  overflow: 'hidden',
  bottom: 0,
  height: ['80svh', '100%'],
  position: ['static', 'absolute'],
  top: [0, '2.75rem'],
  left: 0,
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
