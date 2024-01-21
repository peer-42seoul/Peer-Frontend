import { SxProps } from '@mui/material'

export const pcContainer: SxProps = {
  width: '100vw',
  maxWidth: '124rem',
  padding: 0,
}
export const mobileContainer: SxProps = {}

export const pcStack: SxProps = {
  width: '100%',
  maxWidth: 1280, // 픽셀로 변환?
  boxSizing: 'border-box',
}

export const mobileStack: SxProps = {
  marginTop: '1rem',
}

export const pcContentBox: SxProps = {
  maxWidth: '52.8rem',
  flexGrow: 4,
  width: '70%',
  padding: '2rem',
  boxSizing: 'border-box',
}

export const pcOtherContentBox: SxProps = {
  maxWidth: '76rem',
  flexGrow: 1,
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

export const mobileContentBox: SxProps = {}
