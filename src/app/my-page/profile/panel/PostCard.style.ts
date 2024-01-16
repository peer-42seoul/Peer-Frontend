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
  borderRadius: '0.75rem',
}

export const cardAuthorAvatarStyleBase: SxProps = {
  boxSizing: 'border-box',
  height: '2rem',
  width: '2rem',
}
