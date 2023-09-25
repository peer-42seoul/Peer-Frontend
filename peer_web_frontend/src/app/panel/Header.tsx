'use client'

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { NotificationsNoneOutlined } from '@mui/icons-material'
import { usePathname } from 'next/navigation'
import SearchHeader from '../search/panel/SearchHeader'
import SearchButton from './SearchButton'

const Header = () => {
  const pathname = usePathname()

  return (
    <>
      {pathname === '/search' ? (
        <Box sx={{ flex: 1 }}>
          <SearchHeader />
        </Box>
      ) : (
        <Box sx={{ flex: 1 }}>
          <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <IconButton color="inherit" aria-label="menu">
                <NotificationsNoneOutlined />
              </IconButton>
              <Typography component="div">로고</Typography>
              <IconButton color="inherit" aria-label="menu">
                <SearchButton />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  )
}

export default Header
