import { SxProps } from '@mui/material'

export const cardSize: SxProps = {
  boxSizing: 'border-box',
  maxHeight: '441px',
  maxWidth: '20.5rem',
  borderRadius: '0.75rem',
  width: ['calc(90svh * 328 / 800)', 'calc(80svh * 328 /800)'],
  height: ['calc(90svh * 441 / 800)', 'calc(80svh * 441 /800)'],
}

export const cardStyleBase: SxProps = {
  ...cardSize,
  backgroundColor: 'background.primary',
  borderWidth: '2px',
  borderColor: 'line.base',
  borderStyle: 'solid',
  position: 'absolute',
  top: '50%',
  left: '50%',
}
export const cardTitleStyleBase: SxProps = {
  width: '100%',
  overflow: 'hidden',
  lineHeight: '22.5px',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
}

export const cardChipStyleBase: SxProps = {
  padding: '0 6px',
  backgroundColor: 'background.tertiary',
  borderRadius: '2px',
  height: 'calc(90vw * 24 / 328)',
  maxHeight: '1.5rem',
  '& .MuiChip-label': {
    padding: '0px',
  },
}

export const cardHeaderStyleBase: SxProps = {
  height: '2.5rem',
  width: '100%',
}

export const cardContentStyleBase: SxProps = {
  width: '100%',
  overflow: 'hidden',
  height: '7rem',
  lineHeight: '1.125rem',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
  display: '-webkit-box',
  flex: '1 0 auto',
  padding: 0,
  backgroundColor: 'transparent',
}

export const cardMoreButtonStyle: SxProps = {
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  marginBottom: '0.75rem',
  padding: '0.75rem 1rem',
  height: '2.25rem',
}
