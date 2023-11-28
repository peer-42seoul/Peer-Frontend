import { Box, Container, Stack } from '@mui/material'
import React from 'react'
import SubNavBar from './panel/SubNavBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container sx={{ maxWidth: '1980px', padding: 0 }}>
      <Stack
        justifyContent={'space-between'}
        width={1}
        maxWidth={1280}
        direction={'row'}
        sx={{ flex: '3, 4' }}
      >
        <SubNavBar sx={{ width: '308px' }} />
        <Box
          sx={{
            maxWidth: '908px',
          }}
          flexGrow={1}
          p={[2, 4]}
        >
          {children}
        </Box>
      </Stack>
    </Container>
  )
}

export default Layout
