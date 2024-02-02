'use client'

import { Box } from '@mui/material'
import Header from './layout-panel/Header'
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import MobileNav from './layout-panel/MobileNav'
import PcNav from './layout-panel/PcNav'
import useHeaderStore from '@/states/useHeaderStore'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { setHeaderTitle } = useHeaderStore()
  const pathname = usePathname()
  const pathTitle = useMemo(() => {
    switch (pathname) {
      case '/':
        return '메인'
      case '/recruit/write':
        return '모집글 작성'
      case '/team-list':
        return '팀페이지'
      case '/my-page':
        return '마이페이지'
      case '/my-page/profile':
        return '마이페이지'
      default:
        setHeaderTitle('')
        return undefined
    }
  }, [pathname])

  //@todo 이 부분 살려도 되는지 확인
  // if (
  //   pathname === '/login' ||
  //   pathname === '/signup' ||
  //   pathname === '/find-account'
  // )
  //   return (
  //     <Box sx={{ backgroundColor: 'background.primary' }}>
  //       <div className="mobile-layout">
  //         <Box sx={{ marginBottom: '60px' }}>{children}</Box>
  //       </div>
  //       <div className="pc-layout">
  //         <Box sx={{ marginY: '60px' }}>{children}</Box>
  //       </div>
  //     </Box>
  //   )

  if (pathname === '/showcase' || pathname === '/hitchhiking') {
    return (
      <Box sx={{ backgroundColor: 'background.primary', minHeight: '100svh' }}>
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
    <Box sx={{ backgroundColor: 'background.primary', minHeight: '100svh' }}>
      <div className="mobile-layout">
        <Header title={pathTitle} onlyTitle={pathTitle === '마이페이지'} />
        {/* margin은 header와 bottom appbar의 크기 */}
        <Box sx={{ marginTop: '3.375rem', marginBottom: '64px' }}>
          {children}
        </Box>
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
