import { SxProps } from '@mui/material'

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
}

export const cardMediaPcStyle: SxProps = {
  ...cardMediaStyleBase,
  height: 'calc(80svh * 251 / 800)',
}

export const cardMediaMobileStyle: SxProps = {
  ...cardMediaStyleBase,
  height: 'calc(90vw * 251 / 328)',
}

export const cardAuthorAvatarStyle: SxProps = {
  width: 'calc(90vw * 32 / 328)',
  height: 'calc(90vw * 32 / 328)',
  maxWidth: '2rem',
  maxHeight: '2rem',
  boxSizing: 'border-box',
}
