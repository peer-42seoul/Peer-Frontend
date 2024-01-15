'use client'

import { Box, Stack } from '@mui/material'
import { ReactNode } from 'react'
import ShowcaseHeader from './panel/ShowcaseHeader'

const ShowcaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ backgroundColor: 'background.primary' }}>
      <div className="pc-layout">
        <Stack
          height={'100%'}
          width={'100vw'}
          direction={'row'}
          justifyContent={'center'}
        >
          {children}
        </Stack>
      </div>
      <div className="mobile-layout">
        <Stack height={'80vh'} width={'100%'} overflow={'hidden'}>
          <ShowcaseHeader />
          <Stack width={'100%'}>{children}</Stack>
        </Stack>
      </div>
    </Box>
  )
}

export default ShowcaseLayout
