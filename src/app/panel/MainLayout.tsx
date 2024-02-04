'use client'

import { Box } from '@mui/material'
import Header from './layout-panel/Header'
import { usePathname } from 'next/navigation'
import MobileNav from './layout-panel/MobileNav'
import PcNav from './layout-panel/PcNav'
import { useEffect, useState } from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [innerHeight, setInnerHeight] = useState<number>(0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInnerHeight(window.innerHeight)
    }
  }, [])

  // if (
  //   pathname === '/login' ||
  //   pathname === '/signup' ||
  //   pathname === '/find-account'
  // )
  //   return (
  //     <Box sx={{ backgroundColor: 'background.primary' }}>
  //       <div className="mobile-layout">
  //         <Box sx={{ marginBottom: '64px' }}>{children}</Box>
  //       </div>
  //       <div className="pc-layout">
  //         <Box sx={{ marginY: '64px' }}>{children}</Box>
  //       </div>
  //     </Box>
  //   )

  if (pathname === '/showcase' || pathname === '/hitchhiking') {
    return (
      <Box
        sx={{
          backgroundColor: 'background.primary',
          height: innerHeight === 0 ? '100dvh' : innerHeight,
        }}
      >
        <div className="mobile-layout">
          <Box sx={{ paddingBottom: '64px' }}>{children}</Box>
          <MobileNav />
        </div>
        <div className="pc-layout">
          <PcNav />
          <Box sx={{ paddingY: '64px' }}>{children}</Box>
        </div>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.primary',
        height: innerHeight === 0 ? '100dvh' : innerHeight,
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <div className="mobile-layout">
        <Header pathname={pathname} />
        {/* margin은 header와 bottom appbar의 크기 */}
        <Box
          sx={{
            paddingTop: '3.375rem',
            paddingBottom: '64px',
          }}
        >
          {children}
        </Box>
        <MobileNav />
      </div>
      <div className="pc-layout">
        <PcNav />
        <Box sx={{ paddingY: '64px' }}>{children}</Box>
      </div>
    </Box>
  )
}

export default MainLayout
