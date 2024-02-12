'use client'

import { Box } from '@mui/material'
import Header from './layout-panel/Header'
import { usePathname } from 'next/navigation'
import MobileNav from './layout-panel/MobileNav'
import PcNav from './layout-panel/PcNav'
import useMedia from '@/hook/useMedia'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { isPc } = useMedia()

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
          height: 'fit-content',
          minHeight: '100dvh',
        }}
      >
        {isPc ? (
          <div className="mobile-layout">
            <Box sx={{ marginBottom: '64px' }}>{children}</Box>
            <MobileNav />
          </div>
        ) : (
          <div className="pc-layout">
            <PcNav />
            <Box sx={{ marginY: '64px' }}>{children}</Box>
          </div>
        )}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.primary',
        height: 'fit-content',
        minHeight: '100dvh',
      }}
    >
      {isPc ? (
        <div className="pc-layout">
          <PcNav />
          <Box sx={{ marginY: '64px' }}>{children}</Box>
        </div>
      ) : (
        <div className="mobile-layout">
          <Header pathname={pathname} />
          <Box sx={{ marginTop: '3.375rem', marginBottom: '64px' }}>
            {children}
          </Box>
          <MobileNav />
        </div>
      )}
    </Box>
  )
}

export default MainLayout
