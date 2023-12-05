'use client'

import { Box } from '@mui/material'
import Header from './Header'
import { MobileNav, PcNav } from './NavBar'
import { usePathname } from 'next/navigation'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/find-account'
  )
    return (
      <Box sx={{ backgroundColor: 'background.primary' }}>
        <div className="mobile-layout">
          <Box sx={{ marginBottom: '60px' }}>{children}</Box>
        </div>
        <div className="pc-layout">
          <Box sx={{ marginY: '60px' }}>{children}</Box>
        </div>
      </Box>
    )

  if (pathname === '/showcase') {
    return (
      <Box sx={{ backgroundColor: 'background.primary' }}>
        <div className="mobile-layout">
          <Box sx={{ marginBottom: '64px' }}>{children}</Box>
          <MobileNav />
        </div>
        <div className="pc-layout">
          <PcNav />
          <Box sx={{ marginY: '64px' }}>{children}</Box>
        </div>
      </Box>
    )
  }

  return (
    <Box sx={{ backgroundColor: 'background.primary' }}>
      <div className="mobile-layout">
        <Header />
        <Box sx={{ marginBottom: '64px' }}>{children}</Box>
        <MobileNav />
      </div>
      <div className="pc-layout">
        <PcNav />
        <Box sx={{ marginY: '64px' }}>{children}</Box>
      </div>
    </Box>
  )
}

export default MainLayout
