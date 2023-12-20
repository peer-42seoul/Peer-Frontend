'use client'

import { Stack, Typography } from '@mui/material'
import BackgroundCard from './panel/BackgroundCard'

const CompletePage = () => {
  return (
    <>
      <div className="mobile-layout">
        <Stack
          sx={{
            width: '100%',
            height: '85vh',
            alignItems: 'center',
          }}
        >
          <Typography>Mobile Complete</Typography>
        </Stack>
      </div>
      <div className="pc-layout">
        <Stack
          sx={{
            width: '100%',
            height: '85vh',
            alignItems: 'center',
          }}
        >
          <BackgroundCard />
        </Stack>
      </div>
    </>
  )
}

export default CompletePage
