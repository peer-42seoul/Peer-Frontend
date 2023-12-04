import { Theme } from '@mui/material'

export const PcBox = {
  // 최상위 박스
  width: '52.8rem',
  height: '57.1rem',
  padding: '2rem',
  gap: '2rem',
  backgroundColor: (theme: Theme) => theme.palette.background.primary,
}

export const PcMessageContainer = {
  // 메시지 컨테이너
  width: '49.8rem',
  height: '48.6rem',
  padding: '2rem 1.5rem 3rem 1.5rem',
  gap: '3rem',
  backgroundColor: (theme: Theme) => theme.palette.background.primary,
  border: (theme: Theme) => `1px solid ${theme.palette.line.alternative}`,
  borderRadius: '1rem',
}

export const PcGoToListButton = {
  // 리스트로 가기 버튼
  fontSize: '0.75rem',
}

export const MobileBox = {
  // 모바일 화면 전체
}
