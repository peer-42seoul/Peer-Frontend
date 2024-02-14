import MainPage from './panel/MainPage'
import axios from 'axios'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let data
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SSR_API}/api/v1/recruit?type=STUDY&sort=latest&page=1&pageSize=6&keyword=&due=1주일&due=12개월 이상&region1=&region2=&place=&status=&tag=`,
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

  return <MainPage initData={data} />
}
