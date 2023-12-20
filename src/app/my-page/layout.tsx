import { Container, Stack } from '@mui/material'
import React from 'react'
import SubNavBar from './panel/SubNavBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container sx={{ maxWidth: '124rem', padding: 0 }}>
      <Stack
        justifyContent={'space-between'}
        width={1}
        maxWidth={1280}
        direction={'row'}
        sx={{ flex: '3, 4' }}
      >
        <SubNavBar sx={{ width: '15.3rem' }} />
        <Stack
          direction={'column'}
          alignItems={'center'}
          sx={{
            maxWidth: '56.75rem',
          }}
          flexGrow={1}
        >
          {children}
        </Stack>
      </Stack>
    </Container>
  )
}

export default Layout
