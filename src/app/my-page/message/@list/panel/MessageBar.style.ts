import { Theme } from '@mui/material'

const searchWrapperBase = {
  padding: '0 0.75rem',
  height: '2rem',
  borderRadius: '0.25rem',
  backgroundColor: (theme: Theme) => theme.palette.background.tertiary,
}

export const pcSearchWrapper = {
  ...searchWrapperBase,
  maxWidth: '24.5rem',
}

export const mobileSearchWrapper = {
  ...searchWrapperBase,
  boxSizing: 'border-box',
  width: '100%',
}

export const searchInput = {
  '& .MuiInputBase-input::placeholder': {
    color: (theme: Theme) => theme.palette.text.alternative,
    fontSize: (theme: Theme) => theme.typography.Caption.fontSize,
    fontWeight: (theme: Theme) => theme.typography.Caption.fontWeight,
    lineHeight: (theme: Theme) => theme.typography.Caption.lineHeight,
  },
}

export const manageBarStack = {
  height: '2rem',
}
