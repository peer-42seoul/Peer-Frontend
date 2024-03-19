import type { Metadata } from 'next'
import '../../styles/global.css'
import '../../styles/reset.css'
import MuiThemeProvider from '@/app/panel/MuiThemeProvider'
import CuSWRConfig from './panel/CuSWRConfig'
import MainLayout from './panel/MainLayout'
import { Pretendard } from './panel/font'
import ToastNotification from './panel/layout-panel/ToastNotification'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import DataPickerProvider from './DataPickerProvider'
import GoogleAnalytics from '@/utils/gtag'

const webMetadata = {
  title: 'peer',
  description: '동료를 찾기 위한 가장 빠른 선택',
  url: 'https://peer-study.co.kr/',
  image: 'images/og-image.png',
}

export const metadata: Metadata = {
  title: webMetadata.title,
  description: webMetadata.description,
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
        <link
          rel="shortcut icon"
          href="/icons/favicon.ico"
          type="image/x-icon"
        />
        <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        {/* 사파리 설정*/}
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/icons/ios/72.png"
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
        {/* Html meta tag */}
        <title>{webMetadata.title}</title>
        <meta name="description" content={webMetadata.description} />
        {/* Facebook meta tag */}
        <meta property="og:title" content={webMetadata.title} />
        <meta property="og:description" content={webMetadata.description} />
        <meta property="og:image" content={webMetadata.image} />
        <meta property="og:url" content={webMetadata.url} />
        <meta property="og:type" content="website" />
        {/* Twitter meta tag */}
        <meta name="twitter:title" content={webMetadata.title} />
        <meta name="twitter:description" content={webMetadata.description} />
        <meta name="twitter:image" content={webMetadata.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={webMetadata.url} />
      </head>
      <body className={Pretendard.variable}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <AppRouterCacheProvider>
          <CuSWRConfig>
            <MuiThemeProvider>
              <DataPickerProvider>
                <MainLayout>{children}</MainLayout>
                <div id="modal-root"></div>
                <ToastNotification />
              </DataPickerProvider>
            </MuiThemeProvider>
          </CuSWRConfig>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
