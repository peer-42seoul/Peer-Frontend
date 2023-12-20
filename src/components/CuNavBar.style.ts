import { Theme } from '@mui/material'

export const pcNavBar = {
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '19.25rem',
  padding: '1.5rem 2rem',
}

export const mobileNavBar = {
  marginBottom: '2rem',
}

export const tabs = {
  padding: 0,
}

const selectedTab = {
  '&.Mui-selected': {
    backgroundColor: 'purple.tinted',
  },
}

const disabledTab = {
  '&.Mui-disabled': {
    color: 'custom.disabledNavTab',
    backgroundColor: 'transparent',
  },
}

export const pcTab = {
  height: '2rem',
  maxWidth: '15.3rem',
  width: '100%',
  padding: '0 1.5rem',
  ...selectedTab,
  ...disabledTab,
}

export const newTab = {
  padding: '0 1.5rem 0 4.06rem',
}

export const mobileTab = {
  height: '3rem',
  padding: 0,
  borderRadius: '0.5rem',
  backgroundColor: 'custom.mobileNavTab',
  ...selectedTab,
  ...disabledTab,
}

const iconBoxBase = {
  marginRight: '0.25rem',
  // 아이콘
  '& svg': {
    width: '0.875rem',
    height: '0.875rem',
  },
}

export const iconBox = {
  ...iconBoxBase,
  // 아이콘
  '& > svg > path': {
    fill: (theme: Theme) => theme.palette.text.assistive,
  },
}

export const selectedIconBox = {
  ...iconBoxBase,
  // 아이콘
  '& > svg > path': {
    fill: (theme: Theme) => theme.palette.purple.strong,
  },
}

export const disabledIconBox = {
  ...iconBoxBase,
  // 아이콘
  '& > svg > path': {
    fill: (theme: Theme) => theme.palette.custom.disabledNavTab,
  },
}

export const newTextBadge = {
  display: 'float',
  marginLeft: '1rem',
  color: 'yellow.strong',
}

export const newBadge = {}
