import { Box, Grid } from '@mui/material'
import React from 'react'
import SubNavBar from './panel/SubNavBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ width: '844px' }}>
      <Grid container columns={7} columnSpacing={12}>
        <Grid item sm={3}>
          <SubNavBar />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: 'flex',
            width: '908px',
            padding: '32px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '32px',
          }}
        >
          {children}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Layout
