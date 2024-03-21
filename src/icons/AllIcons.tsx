import * as Icons from '@/icons'
import * as MyPageIcons from '@/icons/MyPage'
import * as NavIcons from '@/icons/Nav'
import * as TeamPage from '@/icons/TeamPage'
import React from 'react'
import { Unstable_Grid2 as Grid, Typography } from '@mui/material'

const AllIcons = () => {
  return (
    <Grid container spacing={4}>
      <Grid container xs={12} spacing={2}>
        <Grid xs={12}>
          <Typography variant="Title3Emphasis">Icons</Typography>
        </Grid>
        {Object.values(Icons).map((IconComponent) => (
          <Grid key={crypto.randomUUID()}>
            <IconComponent
              sx={{
                color: 'text.strong',
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container xs={12} spacing={2}>
        <Grid xs={12}>
          <Typography variant="Title3Emphasis">MyPage Icons</Typography>
        </Grid>
        {Object.values(MyPageIcons).map((IconComponent) => (
          <Grid key={crypto.randomUUID()}>
            <IconComponent
              sx={{
                color: 'text.strong',
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container xs={12} spacing={2}>
        <Grid xs={12}>
          <Typography variant="Title3Emphasis">Navigation Icons</Typography>
        </Grid>
        {Object.values(NavIcons).map((IconComponent) => (
          <Grid key={crypto.randomUUID()}>
            <IconComponent
              sx={{
                color: 'text.strong',
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container xs={12} spacing={2}>
        <Grid xs={12}>
          <Typography variant="Title3Emphasis">Team Page Icons</Typography>
        </Grid>
        {Object.values(TeamPage).map((IconComponent) => (
          <Grid key={crypto.randomUUID()}>
            <IconComponent
              sx={{
                color: 'text.strong',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default AllIcons
