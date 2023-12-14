'use client'

import { Stack, Typography } from '@mui/material'
import BackgroundCard from './panel/BackgroundCard'
import ToastEditor from '@/components/EditorWrapper'

const CompletePage = () => {
  return (
    <>
      <div className="mobile-layout">
        <Stack
          sx={{
            width: '100%',
            height: '100vh',
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
            height: '100vh',
            alignItems: 'center',
          }}
        >
          <BackgroundCard />
          <ToastEditor initialValue="hello" />
        </Stack>
      </div>
    </>
  )
}

export default CompletePage
