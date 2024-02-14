import { SxProps } from '@mui/material'

export const cardSubtitleStyleBase: SxProps = {
  width: '100%',
  overflow: 'hidden',
  lineHeight: '21px',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
}

export const cardTitleStyleBase: SxProps = {
  width: '100%',
  overflow: 'hidden',
  lineHeight: '22.5px',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
}

export const cardMediaStyleBase: SxProps = {
  flexGrow: 1,
  objectFit: 'cover',
  maxHeight: '15.6875rem',
  width: ['calc(90svh * 328 / 800)', 'calc(80svh * 328 /800)'],
  height: ['calc(90svh * 251 / 800)', 'calc(80svh * 251 /800)'],
  p: 0,
  boxSizing: 'border-box',
}

export const cardAuthorAvatarStyleBase: SxProps = {
  maxWidth: '2rem',
  maxHeight: '2rem',
  boxSizing: 'border-box',
  height: ['calc(90svh * 32 / 800)', 'calc(80svh * 32 /800)'],
  width: ['calc(90svh * 32 / 800)', 'calc(80svh * 32 /800)'],
}

export const chipStyleBase: SxProps = {
  borderRadius: '2px',
  height: '1.25rem',
}
