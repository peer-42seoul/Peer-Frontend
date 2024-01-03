import { SxProps } from '@mui/material'

export const cardStyleBase: SxProps = {
  backgroundColor: 'background.primary',
  maxHeight: '441px',
  maxWidth: '20.5rem',
  borderRadius: '0.75rem',
  borderWidth: '2px',
  borderColor: 'line.base',
  borderStyle: 'solid',
  position: 'absolute',
  top: '50%',
  left: '50%',
  boxSizing: 'border-box',
}

export const cardPcStyleBase: SxProps = {
  ...cardStyleBase,
  width: '20.5rem',
  height: '441px',
}

export const cardMobileStyleBase: SxProps = {
  ...cardStyleBase,
  width: '90vw',
  height: 'calc(90vw * 441 / 328)',
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
  '& .MuiChip-label': {
    padding: '0px',
  },
}

export const cardContentStyleBase: SxProps = {
  width: '100%',
  overflow: 'hidden',
  maxHeight: '11.25rem',
  lineHeight: '1.125rem',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
  display: '-webkit-box',
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
