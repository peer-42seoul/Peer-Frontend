import { Box, Container, Stack } from '@mui/material'
import React from 'react'
import NavBar from './panel/NavBar'
import * as style from '@/components/NavBarLayout.style'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container sx={style.container}>
      <Stack
        justifyContent={'space-between'}
        direction={['column', 'row']}
        sx={style.stack}
      >
        <NavBar />
        <Box sx={style.contentBox}>{children}</Box>
      </Stack>
    </Container>
  )
}

export default Layout
