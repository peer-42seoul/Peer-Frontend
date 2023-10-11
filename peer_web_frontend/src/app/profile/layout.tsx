import { Box, Grid } from '@mui/material'
import React from 'react'
import SubNavBar from './MyPage/panel/SubNavBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <Grid container>
        <Grid item sm={3}>
          <SubNavBar />
        </Grid>
        <Grid item xs={12} sm={9}>
          {children}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Layout
