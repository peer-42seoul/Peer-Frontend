import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const CuCircularProgress = ({
  color,
}: {
  color:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1500,
      }}
    >
      <CircularProgress color={color} />
    </Box>
  )
}

export default CuCircularProgress
