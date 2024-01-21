import { CircularProgress, Stack, Typography } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ height: '100%' }}
    >
      <Typography variant="Title2Emphasis">Loading...</Typography>
      <CircularProgress />
    </Stack>
  )
}

export default Loading
