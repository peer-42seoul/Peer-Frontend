'use client'

import { IPost } from '@/types/IPostDetail'
import { IPagination } from '@/types/IPagination'
import PwaInstallBanner from './PwaInstallBanner'
import MainMobileView from '@/app/panel/main-page/MainMobileView'
import MainPcView from '@/app/panel/main-page/MainPcView'
import Footer from '@/app/panel/main-page/Footer'
import PushAlertBanner from './PushAlertBanner'
import MainBanner from '@/app/panel/main-page/MainBanner'
import Tutorial from '@/components/Tutorial'
import { MainPageTutorial } from '@/components/tutorialContent/MainPageTutorial'
import NoDataDolphin from '@/components/NoDataDolphin'
import {
  cardStyle,
  containerStyle,
  floatButtonStyle,
  sideMenuStyle,
} from '@/app/panel/main-page/Mainpage.style'
import SearchOptionPanel from '@/app/panel/main-page/MainPanel'
import SelectSort from '@/app/panel/main-page/SelectSort'
import useMedia from '@/hook/useMedia'
import Footer from './main-page/Footer'

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
      <PushAlertBanner />
      {/* mobile view */}
      <div className="mobile-layout">
        <MainMobileView initData={initData} />
        <Footer />
      </div>
      {/* pc view */}
      <div className="pc-layout">
        <MainPcView initData={initData} />
        <Footer />
      </div>
      <PwaInstallBanner />
    </>
  )
}

export default MainPage
