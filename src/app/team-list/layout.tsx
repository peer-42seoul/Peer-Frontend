'use client'

import { Container, Stack, Box } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import Sidebar from './panel/Sidebar'
import * as style from './layout.style'

const TeamsLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  return (
    <Container sx={style.container}>
      <Stack
        justifyContent={'space-between'}
        direction={['column', 'row']}
        sx={style.stack}
      >
        <Sidebar />
        <Box sx={style.contentBox}>{children}</Box>
      </Stack>
    </Container>
  )
}

export default TeamsLayout
