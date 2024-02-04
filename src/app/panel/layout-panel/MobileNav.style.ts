export const bottomNavStyle = {
  minWidth: 'auto',
  padding: '6px 0',
  '& .MuiBottomNavigationAction-label': {
    color: 'text.assistive',
  },
  '& .MuiTypography-root': {
    color: 'text.assistive',
  },
  '&.Mui-selected': {
    '& .MuiBottomNavigationAction-label': {
      color: 'text.normal',
    },
    '& .MuiSvgIcon-root': {
      color: 'text.normal',
    },
    '& .MuiTypography-root': {
      color: 'text.normal',
    },
  },
}
