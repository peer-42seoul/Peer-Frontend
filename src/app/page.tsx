import axios from 'axios'
import PushAlertBanner from '@/app/panel/PushAlertBanner'
import MainMobileView from '@/app/panel/main-page/MainMobileView'
import Footer from '@/app/panel/main-page/Footer'
import MainPcView from '@/app/panel/main-page/MainPcView'
import PwaInstallBanner from '@/app/panel/PwaInstallBanner'

export const dynamic = 'force-dynamic'

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>

  prompt(): Promise<void>
}

export default async function Home({ searchParams }: { searchParams: any }) {
  let data
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SSR_API}/api/v1/recruit?type=${
        searchParams?.type ?? 'STUDY'
      }&sort=latest&page=1&pageSize=6&keyword=&due=1주일&due=12개월 이상&region1=&region2=&place=&status=&tag=`,
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
    data = response.data
  } catch (err) {
    console.error('데이터를 불러오는데 실패했습니다.')
  }

  return (
    <>
      <PushAlertBanner />
      {/* mobile view */}
      <div className="mobile-layout">
        <MainMobileView initData={data} />
        <Footer />
      </div>
      {/* pc view */}
      <div className="pc-layout">
        <MainPcView initData={data} />
        <Footer />
      </div>
      <PwaInstallBanner />
    </>
  )
}
