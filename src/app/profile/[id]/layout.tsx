'use client'

import React from 'react'
import useMedia from '@/hook/useMedia'
import { Container, Stack, Box } from '@mui/material'
import * as style from '../../my-page/layout.style'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isPc } = useMedia()
  return (
    <Container sx={style.container}>
      <Stack
        justifyContent={'center'}
        direction={isPc ? 'row' : 'column'}
        spacing={'2rem'}
        sx={style.stack}
      >
        <Box sx={style.contentBox}>{children}</Box>
      </Stack>
    </Container>
  )
}

export default Layout
