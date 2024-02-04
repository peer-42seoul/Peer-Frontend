import { SxProps } from '@mui/material'

export const tagListStyle: SxProps = {
  height: '3rem',
  overflow: 'auto',
  flexWrap: 'wrap',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  gap: '0.25rem',
  marginTop: 1,
  flexDirection: 'row',
}

export const ChipStyle: SxProps = {
  position: 'absolute',
  top: 16,
  left: 16,
  borderRadius: 1,
  backgroundColor: 'background.tertiary',
  color: 'text.normal',
  height: '1.25rem',
  '& .MuiChip-label': {
    paddingX: '0.375rem',
  },
}
