import type { Metadata } from 'next'
import '../../styles/global.css'
import '../../styles/reset.css'
import MuiThemeProvider from '@/app/panel/MuiThemeProvider'
import CuSWRConfig from './panel/CuSWRConfig'
import MainLayout from './panel/MainLayout'
import { Pretendard } from './panel/font'
import ToastNotification from './panel/layout-panel/ToastNotification'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/public/icons/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        {/* 사파리 설정*/}
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/icons/ios/72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="96x96"
          href="/images/icons/ios/96.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="128x128"
          href="/images/icons/ios/128.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/icons/ios/144.png"
        />
        <meta name="apple-mobile-web-app-title" content="peer" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" />
        <meta name="theme-color" content="#010456" />
      </head>
      <body className={Pretendard.className}>
        <AppRouterCacheProvider>
          <CuSWRConfig>
            <MuiThemeProvider>
              <MainLayout>{children}</MainLayout>
              <div id="modal-root"></div>
              <ToastNotification />
            </MuiThemeProvider>
          </CuSWRConfig>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
