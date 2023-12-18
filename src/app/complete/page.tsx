'use client'

import { Stack, Typography } from '@mui/material'
import BackgroundCard from './panel/BackgroundCard'
import ToastEditorWrapper from '@/components/EditorWrapper'

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
          <ToastEditorWrapper initialValue="" theme="dark" height="300px" />
        </Stack>
      </div>
    </>
  )
}

export default CompletePage
