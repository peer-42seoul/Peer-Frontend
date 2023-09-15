import type { Metadata } from 'next'
import "../../styles/global.css"
import "../../styles/reset.css"
import NavBar from './panel/NavBar'
import Header from './panel/Header'
import { Box, Stack } from '@mui/material'

export const metadata: Metadata = {
  title: 'peer',
  description: 'This is a website of the peer, by the peer, for the peer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head />
      <body>
        <div className="layout">
          <NavBar />
          <Stack flex={1} >
            <Box>
              <Header />
            </Box>
            {/* 헤더 고정 시 여기에 margin-top: 추가 */}
            <Box sx={{ marginBottom: "100px" }}>
              {children}
            </Box>
          </Stack>
        </div>
      </body>
    </html>
  )
}
