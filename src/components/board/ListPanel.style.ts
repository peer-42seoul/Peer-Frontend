import { Theme } from '@mui/material'

export const ListPageContainer = {
  boxSizing: 'border-box',
  width: '100%',
  padding: '2rem',
}

export const ListBoxContainer = {
  boxSizing: 'border-box',
  width: '100%',
  padding: '1.5rem',
  borderRadius: '1rem',
  background: (theme: Theme) => theme.palette.background.secondary,
}

export const ListStack = {
  width: '100%',
  // TODO : 무한 스크롤 구현 OR 페이지네이션 구현
  // 임시 스타일
  height: '300px',
  overflowY: 'scroll',
}
