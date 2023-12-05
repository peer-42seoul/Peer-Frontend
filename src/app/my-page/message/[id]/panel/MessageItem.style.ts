import { Theme } from '@mui/material'

export const contentMarginTop = {
  marginTop: '0',
}

export const contentMarginNormal = {
  marginTop: '0.5rem',
}

export const contentMarginExtra = {
  marginTop: '1.5rem',
}

export const date = {
  height: '100%',
}

const messageBase = {
  padding: '1rem 1.25rem',
  borderRadius: '0.75rem',
  maxWidth: '32.5rem',
}

export const ownerMessage = {
  ...messageBase,
  backgroundColor: (theme: Theme) => theme.palette.purple.strong,
  color: '#E3E3E3', // 한군데만 적용되는 color는 theme에 추가하지 않아도 될 듯..?
}

export const targetAvatar = {
  width: '2rem',
  height: '2rem',
}

export const dummyAvatar = {
  ...targetAvatar,
  visibility: 'hidden',
}

export const targetMessage = {
  ...messageBase,
  backgroundColor: (theme: Theme) => theme.palette.background.secondary,
  color: '#BABABA',
}
