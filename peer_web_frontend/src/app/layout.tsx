import type { Metadata } from 'next'
import NavBar from './component/NavBar'
import '/styles/global.css'

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
          {children}
        </div>
      </body>
    </html>
  )
}
