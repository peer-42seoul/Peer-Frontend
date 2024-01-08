import { SxProps } from '@mui/material'

export const tabStyleBase: SxProps = {
  '&.Mui-selected': {
    color: 'text.normal',
  },
  height: '2.5rem',
  minHeight: '2.5rem',
  boxSizing: 'border-box',
}

export const tabPcStyle: SxProps = {
  color: 'text.alternative',
  ...tabStyleBase,
}

export const tabMobileStyle: SxProps = {
  color: 'text.assistive',
  ...tabStyleBase,
}
