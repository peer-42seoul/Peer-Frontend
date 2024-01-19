import { Theme } from '@mui/material'

export const ListPageContainer = {
  boxSizing: 'border-box',
  width: '100%',
  padding: '2rem',
}

export const ListBoxContainer = {
  boxSizing: 'border-box',
  width: '100%',
  maxHeight: '53.625rem',
  padding: '1.5rem',
  borderRadius: '1rem',
  background: (theme: Theme) => theme.palette.background.secondary,
}

export const PcListStack = {
  // 페이징 방식이 페이지네이션이 될 경우 수정될 수 있음
  height: '100%',
  overflowY: 'scroll',
}

export const ListItem = {
  '&:hover': {
    cursor: 'pointer',
  },
}
