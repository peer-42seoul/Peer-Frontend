import { SxProps } from '@mui/material'

export const pcContainer: SxProps = { maxWidth: '124rem', padding: 0 }
export const mobileContainer: SxProps = {}

export const pcStack: SxProps = {
  width: '100%',
  //   maxWidth: 1280, // 필요한 경우 주석 해제
  flex: '3, 4',
}

export const mobileStack: SxProps = {}

export const pcContentBox: SxProps = {
  maxWidth: '57rem',
  flexGrow: 1,
  p: [2, 4],
}

export const mobileContentBox: SxProps = {}
