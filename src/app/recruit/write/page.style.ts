import { SxProps } from '@mui/material'

export const iconStyleBase: SxProps = {
  width: '1rem',
  height: '1rem',
}

export const interviewButtonMobileStyle: SxProps = {
  alignItems: 'center',
  with: '100%',
}

export const containerStyle: SxProps = {
  pt: [undefined, '4rem'],
  maxWidth: '76rem',
}

export const boxStyle: SxProps = {
  boxSizing: 'border-box',
  width: '100%',
  borderRadius: ['1rem', '0.75rem'],
  paddingX: '1rem',
  paddingY: '1.5rem',
  paddingTop: ['2.5rem', undefined],
  backgroundColor: 'background.secondary',
  // overflowY: 'scroll',
}

export const radioButtonStyle: SxProps = {
  width: '1.5rem',
  height: '1.5rem',
  color: 'text.alternative',
  boxSizing: 'border-box',
  '&.Mui-checked': {
    color: 'text.alternative',
  },
}
