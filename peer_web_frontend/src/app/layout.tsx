import type { Metadata } from 'next'
import NavBar from './panel/NavBar'
import "../../styles/global.css"
import Header from './panel/Header'

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
        <div className="layout" >
          <NavBar />
          <div style={{display: 'flex', flexDirection: "column", flex: 1}}>
          <Header/>
          {children}
          </div>
        </div>
      </body>
    </html>
  )
}
