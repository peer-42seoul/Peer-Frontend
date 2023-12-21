'use client'

import useMedia from '@/hook/useMedia'
import { Stack } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import Sidebar from './panel/Sidebar'

const TeamsLayout = ({ children }: { children: ReactNode }) => {
  const { isPc, isTablet } = useMedia()

  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  return (
    <Stack
      display="flex"
      padding={'0.5rem'}
      spacing={'1rem'}
      px={isPc && !isTablet ? '10.5rem' : '1.5rem'}
      height={'81.5vh'}
    >
      <Stack spacing={'2.5rem'} direction={isPc ? 'row' : 'column'}>
        <Sidebar />
        {children}
      </Stack>
    </Stack>
  )
}

export default TeamsLayout
