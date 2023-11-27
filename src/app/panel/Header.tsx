'use client'

import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchButton from './SearchButton'
import { useState } from 'react'
import AlertIcon from './AlertIcon'

const Header = () => {
  return (
    <>
      <Box sx={{ flex: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <AlertIcon />
            <Typography component="div">로고</Typography>
            <SearchButton />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
