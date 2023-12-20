import { SxProps } from '@mui/material'

export const pcContainer: SxProps = { maxWidth: '124rem', padding: 0 }
export const mobileContainer: SxProps = {}

export const pcStack: SxProps = {
  width: '100%',
  maxWidth: 1280, // 픽셀로 변환?
  flex: '3, 4',
}

export const mobileStack: SxProps = {
  marginTop: '1rem',
}

export const pcContentBox: SxProps = {
  maxWidth: '52.8rem',
  flexGrow: 1,
  padding: '2rem',
}

export const mobileContentBox: SxProps = {}
