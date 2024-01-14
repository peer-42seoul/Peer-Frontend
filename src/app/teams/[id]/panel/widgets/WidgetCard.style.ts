import { SxProps } from '@mui/material'

export const widgetCard: SxProps = {
  borderRadius: '1rem',
  backgroundColor: 'background.secondary',
  width: '100%',
  height: '100%',
}

export const widgetCardContent: SxProps = {
  // mui CardContent에 들어가는 마지막 child 요소에 padding을 주도록 되어 있어서 이를 제거
  padding: '0 !important',
  '&:last-child': {
    paddingBottom: '0 !important',
  },
}
