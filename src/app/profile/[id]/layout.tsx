import React from 'react'
import { Container, Stack, Box } from '@mui/material'
import * as style from '../../my-page/layout.style'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container sx={style.container}>
      <Stack
        justifyContent={'center'}
        direction={['column', 'row']}
        spacing={'2rem'}
        sx={style.stack}
      >
        <Box sx={style.contentBox}>{children}</Box>
      </Stack>
    </Container>
  )
}

export default Layout
