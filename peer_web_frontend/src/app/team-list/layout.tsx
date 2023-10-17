'use client'

import useMedia from '@/hook/useMedia'
import { Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'
import Sidebar from './panel/Sidebar'

const TeamsLayout = ({ children }: { children: ReactNode }) => {
  const { isPc } = useMedia()

  return (
    <Stack display="flex" padding={1} px={10} spacing={2}>
      <Stack textAlign="center">
        <Typography fontWeight="bold">나의 팀페이지</Typography>
      </Stack>
      <Stack spacing={2} direction={isPc ? 'row' : 'column'}>
        <Sidebar />
        {children}
      </Stack>
    </Stack>
  )
}

export default TeamsLayout
