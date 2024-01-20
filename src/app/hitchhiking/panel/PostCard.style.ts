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

export const cardAuthorAvatarStyleBase: SxProps = {
  maxWidth: '2rem',
  maxHeight: '2rem',
  boxSizing: 'border-box',
}

export const chipStyleBase: SxProps = {
  borderRadius: '2px',
  height: '1.25rem',
}
