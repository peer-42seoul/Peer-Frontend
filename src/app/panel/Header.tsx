'use client'

import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import SearchButton from './SearchButton'
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
