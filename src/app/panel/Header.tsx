'use client'

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { NotificationsNoneOutlined } from '@mui/icons-material'
import SearchButton from './main-page/SearchButton'

const Header = () => {
  return (
    <>
      <Box sx={{ flex: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton color="inherit" aria-label="menu">
              <NotificationsNoneOutlined />
            </IconButton>
            <Typography component="div">로고</Typography>
            <SearchButton />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
