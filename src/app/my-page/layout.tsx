import { Container, Grid } from '@mui/material'
import React from 'react'
import SubNavBar from './panel/SubNavBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container sx={{ maxWidth: '1980px', padding: 0 }}>
      <Grid
        container
        columns={7}
        justifyContent={'space-between'}
        width={1}
        maxWidth={1280}
      >
        <Grid item xs={0} sm={3} sx={{ maxWidth: '308px' }}>
          <SubNavBar />
        </Grid>
        <Grid
          item
          xs={7}
          sm={4}
          sx={{
            maxWidth: '844px',
          }}
          p={[2, 4]}
        >
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Layout
