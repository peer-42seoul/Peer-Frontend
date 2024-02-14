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

const pcBase = {
  padding: '1rem 1.25rem',
  borderRadius: '0.75rem',
  maxWidth: '32.5rem',
  wordBreak: 'break-all',
}

const mobileBase = {
  padding: '0.75rem',
  borderRadius: '0.75rem',
  maxWidth: '70%',
  wordBreak: 'break-all',
}

const ownerBase = {
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

const targetBase = {
  backgroundColor: (theme: Theme) => theme.palette.background.secondary,
  color: '#BABABA',
}

export const targetPc = {
  ...pcBase,
  ...targetBase,
}

export const ownerPc = {
  ...pcBase,
  ...ownerBase,
}

export const targetMobile = {
  ...mobileBase,
  ...targetBase,
}

export const ownerMobile = {
  ...mobileBase,
  ...ownerBase,
}
