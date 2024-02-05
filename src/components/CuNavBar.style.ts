import { SxProps, Theme } from '@mui/material'

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
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  padding: 0,
  '& .MuiToggleButtonGroup-grouped': {
    borderRadius: '0.5rem',
  },
}

const tabBase = {
  border: 'none',
  svg: {
    fill: (theme: Theme) => theme.palette.text.assistive,
  },
}

const selectedTab = {
  '&.Mui-selected': {
    backgroundColor: ['purple.tinted', 'background.tertiary'],
    '& span': {
      color: ['purple.strong', 'text.normal'],
    },
    '& svg': {
      fill: (theme: Theme) => theme.palette.purple.strong,
    },
  },
}

const disabledTab = {
  '&.Mui-disabled': {
    color: 'text.disable',
    backgroundColor: 'transparent',
    border: 'none',
    '& svg': {
      fill: (theme: Theme) => theme.palette.text.disable,
    },
  },
}

export const pcTab: SxProps = {
  borderRadius: '0.5rem',
  height: '2rem',
  maxWidth: '15.3rem',
  width: '100%',
  padding: '0 1.5rem',
  margin: '0.25rem 0',
  '& span': {
    color: 'text.assistive',
  },
  ...tabBase,
  ...selectedTab,
  ...disabledTab,
}

export const newTab = {
  padding: '0 1.5rem 0 4.06rem',
}

export const mobileTab = {
  height: '3rem',
  minWidth: '3rem',
  // width: 인라인에서 비율로 지정해둠
  padding: 0,
  borderRadius: '0.5rem',
  backgroundColor: 'custom.mobileNavTab',
  ...tabBase,
  ...selectedTab,
  ...disabledTab,
  '& span': {
    color: 'text.assistive',
  },
}

export const iconBoxBase = {
  '& svg': {
    display: 'block',
    width: '0.875rem',
    height: '0.875rem',
  },
}

export const newTextBadge = {
  display: 'float',
  marginLeft: '1rem !important', // stack의 spacing을 덮어씌우기 위해 !important 사용
  color: 'yellow.strong',
}

const BADGE_TRANSLATE = 'translate(130%, -50%)'

export const badgeBase = {
  '& .MuiBadge-badge': {
    width: '3px',
    minWidth: '3px', // mui 기본 설정 디자인 오버라이딩
    height: '3px',
    backgroundColor: (theme: Theme) => theme.palette.yellow.strong,
    // mui 기본 설정 디자인 오버라이딩
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

export const newBadge = {
  '& .MuiBadge-badge': {
    backgroundColor: (theme: Theme) => theme.palette.yellow.strong,
  },
}

export const betaBadge = {
  '& .MuiBadge-badge': {
    backgroundColor: (theme: Theme) => theme.palette.red.strong,
  },
}
