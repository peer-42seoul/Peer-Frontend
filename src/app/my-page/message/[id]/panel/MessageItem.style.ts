import { Theme } from '@mui/material'

export const extraMargin = {
  marginTop: '1rem', // TODO : collapse 여부에 따라 '1rem' or '1.5rem' 조정할것
}

export const ownerMessage = {
  padding: '1rem 1.25rem',
  borderRadius: '0.75rem',
  backgroundColor: (theme: Theme) => theme.palette.purple.strong,
  color: '#E3E3E3', // 한군데만 적용되는 color는 theme에 추가하지 않아도 될 듯..?
}
