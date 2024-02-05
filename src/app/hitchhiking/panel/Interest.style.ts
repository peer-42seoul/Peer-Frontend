import { SxProps } from '@mui/material'
import { centeredPosition } from '@/constant/centerdPosition.style'

export const iconButtonStyle: SxProps = {
  backgroundColor: 'background.tertiary',
  borderRadius: '20px',
  padding: '8px',
  width: '40px',
  height: '40px',
  position: 'relative',
}

export const iconStyleBase: SxProps = {
  transition: 'color 0.1s linear',
  ...centeredPosition,
}
