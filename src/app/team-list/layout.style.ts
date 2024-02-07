import { SxProps } from '@mui/material'

export const container: SxProps = {
  width: [undefined, '100vw'],
  maxWidth: [undefined, '80rem'],
  padding: [undefined, 0],
  boxSizing: [undefined, 'border-box'],
}

export const stack: SxProps = {
  width: [undefined, '100%'],
  maxWidth: [undefined, '80rem'],
  boxSizing: [undefined, 'border-box'],
  marginTop: ['1rem', undefined],
}

export const contentBox: SxProps = {
  maxWidth: [undefined, '52.8rem'],
  flexGrow: [undefined, 4],
  width: [undefined, '70%'],
  padding: [undefined, '2rem'],
  boxSizing: [undefined, 'border-box'],
}
