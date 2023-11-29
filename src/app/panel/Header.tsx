'use client'

import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import SearchButton from './main-page/SearchButton'
import Image from 'next/image'
import AlertIcon from './AlertIcon'

const Header = () => {
  return (
    <>
      <Box sx={{ flex: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <AlertIcon />
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
