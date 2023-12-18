'use client'

import { Box, Container, Stack } from '@mui/material'
import React from 'react'
import NavBar from './panel/NavBar'
import useMedia from '@/hook/useMedia'
import * as style from './layout.style'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isPc } = useMedia()
  return (
    <Container sx={isPc ? style.pcContainer : style.mobileContainer}>
      <Stack
        justifyContent={'space-between'}
        direction={'row'}
        sx={isPc ? style.pcStack : style.mobileStack}
      >
        <NavBar />
        <Box sx={isPc ? style.pcContentBox : style.mobileContentBox}>
          {children}
        </Box>
      </Stack>
    </Container>
  )
}

export default Layout
