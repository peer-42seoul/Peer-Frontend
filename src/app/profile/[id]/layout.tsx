'use client'

import React from 'react'
import useMedia from '@/hook/useMedia'
import { Container, Stack, Box } from '@mui/material'
import * as style from '../../my-page/layout.style'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isPc } = useMedia()
  return (
    <Container>
      <Stack
        justifyContent={'center'}
        direction={isPc ? 'row' : 'column'}
        spacing={'2rem'}
        sx={isPc ? style.pcStack : style.mobileStack}
      >
        <Box sx={isPc ? style.pcOtherContentBox : style.mobileContentBox}>
          {children}
        </Box>
      </Stack>
    </Container>
  )
}

export default Layout
