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
  width: '0.875rem',
  height: '0.875rem',
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

const BADGE_TRANSLATE = 'translate(100%, 70%)'

export const newBadge = {
  '& .MuiBadge-badge': {
    width: '3px',
    minWidth: '3px', // 기본 설정 디자인 오버라이딩
    height: '3px',
    backgroundColor: (theme: Theme) => theme.palette.yellow.strong,
    // 기본 설정 디자인 오버라이딩
    transform: `scale(1) ${BADGE_TRANSLATE}`,
    WebkitTransform: `scale(1) ${BADGE_TRANSLATE}`,
    msTransform: `scale(1) ${BADGE_TRANSLATE}`,
    MozTransform: `scale(1) ${BADGE_TRANSLATE}`,
    '&.MuiBadge-invisible': {
      transform: `scale(0) ${BADGE_TRANSLATE}`,
      WebkitTransform: `scale(0) ${BADGE_TRANSLATE}`,
      msTransform: `scale(0) ${BADGE_TRANSLATE}`,
      MozTransform: `scale(0) ${BADGE_TRANSLATE}`,
    },
  },
}
