'use client'

import { Box, Container, Stack } from '@mui/material'
import React from 'react'
import NavBar from './panel/NavBar'
import useMedia from '@/hook/useMedia'
import * as style from './layout.style'

const Layout = ({ children }: { children: React.ReactNode }) => {
  // TODO : #443에 추가된 페이지 레이아웃 디자인을 적용해야 함.
  const { isPc } = useMedia()
  return (
    <Container sx={isPc ? style.pcContainer : style.mobileContainer}>
      <Stack
        justifyContent={'space-between'}
        direction={isPc ? 'row' : 'column'}
        spacing={0}
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
