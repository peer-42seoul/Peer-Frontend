'use client'

import { AppBar, Box, Toolbar } from '@mui/material'
import SearchButton from './main-page/SearchButton'
import AlertIcon from './AlertIcon'

const Header = () => {
  return (
    <>
      <Box sx={{ flex: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <AlertIcon />
            <Box
              component="img"
              src={'/icons/peer-logo.svg'}
              alt={'peer-logo'}
            />
            <SearchButton />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
