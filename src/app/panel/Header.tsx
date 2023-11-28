'use client'

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { NotificationsNoneOutlined } from '@mui/icons-material'
import SearchButton from './main-page/SearchButton'
import Image from 'next/image'

const Header = () => {
  return (
    <>
      <Box sx={{ flex: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton color="inherit" aria-label="menu">
              <NotificationsNoneOutlined />
            </IconButton>
            <Typography component="div">
              <Image
                src={'/icons/peer-logo.svg'}
                alt={'peer-logo'}
                width={50}
                height={50}
              />
            </Typography>
            <SearchButton />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
