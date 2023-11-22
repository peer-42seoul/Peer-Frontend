'use client'

import useMedia from '@/hook/useMedia'
import { Stack } from '@mui/material'
import { ReactNode } from 'react'
import Sidebar from './panel/Sidebar'

const TeamsLayout = ({ children }: { children: ReactNode }) => {
  const { isPc, isTablet } = useMedia()

  return (
    <Stack
      display="flex"
      padding={1}
      spacing={2}
      px={isPc ? 25 : isTablet ? 15 : 3}
      height={'100vh'}
    >
      <Stack spacing={5} direction={isPc ? 'row' : 'column'}>
        <Sidebar />
        {children}
      </Stack>
    </Stack>
  )
}

export default TeamsLayout
