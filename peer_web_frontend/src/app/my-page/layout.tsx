import { Container, Grid } from '@mui/material'
import React from 'react'
import SubNavBar from './panel/SubNavBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container sx={{ maxWidth: '1980' }}>
      <Grid
        container
        columns={7}
        columnSpacing={[0, 8]}
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
          width={1}
          sx={{
            maxWidth: '844px',
            padding: '32px',
          }}
        >
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Layout
