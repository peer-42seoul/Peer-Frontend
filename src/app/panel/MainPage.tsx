'use client'

import { IPost } from '@/types/IPostDetail'
import { IPagination } from '@/types/IPagination'
import PwaInstallBanner from './PwaInstallBanner'
import MainMobileView from '@/app/panel/main-page/MainMobileView'
import MainPcView from '@/app/panel/main-page/MainPcView'

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>

  prompt(): Promise<void>
}

export type ProjectSort = 'latest' | 'hit'

const MainPage = ({ initData }: { initData: IPagination<IPost[]> }) => {
  return (
    <>
      {/* <PushAlertBanner /> */}
      {/* mobile view */}
      <div className="mobile-layout">
        <MainMobileView initData={initData} />
      </div>
      {/* pc view */}
      <div className="pc-layout">
        <MainPcView initData={initData} />
      </div>
      <PwaInstallBanner />
    </>
  )
}

export default MainPage
