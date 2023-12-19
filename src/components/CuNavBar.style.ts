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

export const pcTabs = {
  width: '100%',
  padding: 0,
}

export const mobileTabs = {}

const selectedTab = {
  '&.Mui-selected': {
    backgroundColor: 'purple.tinted',
  },
}

export const pcTab = {
  height: '2rem',
  maxWidth: '15.3rem',
  padding: 0,
  width: '100%',
  ...selectedTab,
}

export const mobileTab = {
  height: '3rem',
  width: '3.6875rem',
  padding: 0,
  ...selectedTab,
}

export const iconBox = {
  // 내부 아이콘 크기 지정용
  '& svg': {
    width: '0.875rem',
    height: '0.875rem',
    '& path': {
      fill: (theme: Theme) => theme.palette.text.assistive,
    },
  },
}

export const selectedIconBox = {
  '& svg': {
    width: '0.875rem',
    height: '0.875rem',
    '& path': {
      fill: (theme: Theme) => theme.palette.purple.strong,
    },
  },
}

export const newTextBadge = {
  marginLeft: '1rem',
  color: 'yellow.strong',
}

export const newBadge = {}
