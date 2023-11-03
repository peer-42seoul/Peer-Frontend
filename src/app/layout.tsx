import type { Metadata } from 'next'
import '../../styles/global.css'
import '../../styles/reset.css'
import { MobileNav, PcNav } from './panel/NavBar'
import Header from './panel/Header'
import MuiThemeProvider from '@/app/panel/MuiThemeProvider'
import { Box } from '@mui/material'
import CuSWRConfig from './panel/CuSWRConfig'

export const metadata: Metadata = {
  title: 'peer',
  description: 'This is a website of the peer, by the peer, for the peer.',
}

// 개선 필요, 레이아웃 쉬프트 현상 고쳐야함
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head />
      <body>
        <CuSWRConfig>
          <MuiThemeProvider>
            <div className="mobile-layout">
              <Header />
              {/* 헤더 고정 시 여기에 margin-top: 추가 */}
              {/* 상하단 여백 어떻게 할지 조정 필요 */}
              <Box sx={{ marginBottom: '56px' }}>{children}</Box>
              <MobileNav />
            </div>
            <div className="pc-layout">
              <PcNav />
              <Box sx={{ marginY: '56px' }}>{children}</Box>
            </div>
            <div id="modal-root"></div>
          </MuiThemeProvider>
        </CuSWRConfig>
      </body>
    </html>
  )
}
