export const navContainerStyle = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  overflow: 'hidden',
  zIndex: 1300,
  backgroundColor: 'background.primary',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}

export const navStyle = {
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

export const bottomNavStyle = {
  ...navStyle,
  minWidth: 'auto',
  padding: 0,
}
