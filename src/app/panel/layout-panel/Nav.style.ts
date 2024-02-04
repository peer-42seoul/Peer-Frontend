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
    color: 'text.normal',
  },
  '& .MuiTypography-root': {
    color: 'text.normal',
  },
  '&.Mui-selected': {
    '& .MuiBottomNavigationAction-label': {
      color: 'text.primary',
    },
    '& .MuiSvgIcon-root': {
      color: 'text.primary',
    },
    '& .MuiTypography-root': {
      color: 'text.primary',
    },
  },
}

export const bottomNavStyle = {
  ...navStyle,
  minWidth: 'auto',
  padding: 0,
}
