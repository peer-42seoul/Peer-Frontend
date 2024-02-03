'use client'

import { Box } from '@mui/material'
import Header from './layout-panel/Header'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import MobileNav from './layout-panel/MobileNav'
import PcNav from './layout-panel/PcNav'
import useAuthStore from '@/states/useAuthStore'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const [pathTitle, setPathTitle] = useState<string | undefined>(undefined)
  useEffect(() => {
    if (pathname === '/') {
      setPathTitle('메인')
    } else if (pathname.startsWith('/login')) {
      setPathTitle('로그인')
    } else if (pathname.startsWith('/team-list')) {
      if (!isLogin) {
        router.push('/login?redirect=/team-list')
      } else setPathTitle('팀페이지')
    } else if (pathname.startsWith('/my-page')) {
      if (!isLogin) {
        router.push('/login?redirect=/my-page')
      } else setPathTitle('마이페이지')
    } else {
      setPathTitle(undefined)
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
  //         <Box sx={{ marginBottom: '64px' }}>{children}</Box>
  //       </div>
  //       <div className="pc-layout">
  //         <Box sx={{ marginY: '64px' }}>{children}</Box>
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
    <Box sx={{ backgroundColor: 'background.primary', minHeight: '100dvh' }}>
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
