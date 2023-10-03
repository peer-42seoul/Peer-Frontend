import type { Metadata } from 'next'
import '../../styles/global.css'
import '../../styles/reset.css'
import NavBar from './panel/NavBar'
import Header from './panel/Header'
import { Box } from '@mui/material'

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
        <div className="mobile-layout">
          <Header />
          {/* 헤더 고정 시 여기에 margin-top: 추가 */}
          {/* 상하단 여백 어떻게 할지 조정 필요 */}
          <Box sx={{ marginBottom: '16px' }}>{children}</Box>
          <NavBar />
        </div>
        <div className="pc-layout">
          <NavBar />
          <Box sx={{ marginY: '56px' }}>{children}</Box>
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  )
}
