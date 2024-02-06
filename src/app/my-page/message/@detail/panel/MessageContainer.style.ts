import { Theme } from '@mui/material'

export const pcBox = {
  height: '57.1rem',
  backgroundColor: (theme: Theme) => theme.palette.background.primary,
}

export const pcMessageContainer = {
  // 메시지 컨테이너
  boxSizing: 'border-box',
  width: '100%',
  // width: '49.8rem',
  height: '48.6rem',
  padding: '2rem 1.5rem 3rem 1.5rem',
  backgroundColor: (theme: Theme) => theme.palette.background.primary,
  border: (theme: Theme) => `1px solid ${theme.palette.line.alternative}`,
  borderRadius: '1rem',
}

export const pcGoToListButton = {
  // 리스트로 가기 버튼
  fontSize: '0.75rem',
  padding: '0.81rem 0.25rem',
}

export const mobileBox = {
  // 모바일 화면 전체
}
