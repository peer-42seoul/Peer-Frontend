'use client'

import { AppBar, Box, Stack, Toolbar } from '@mui/material'
import SearchButton from '../main-page/SearchButton'
import AlertIcon from './AlertIcon'
import PeerLogo from '@/app/panel/layout-panel/PeerLogo'

const Header = () => {
  return (
    <>
      <Box sx={{ flex: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <AlertIcon />
            <Stack alignItems={'center'} justifyContent={'center'}>
              <PeerLogo sx={{ width: 50, height: 50 }} />
            </Stack>
            <SearchButton />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
