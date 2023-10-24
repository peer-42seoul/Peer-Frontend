import { fetchServerData } from '@/api/fetchers'
import MainPage from './panel/MainPage'

export type ProjectSort = 'recent' | 'old' | 'popular'
export type ProjectType = 'studies' | 'projects'

export default async function Home() {
  const data = await fetchServerData(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/main?type=projects&sort=recent&page=1&pagesize=10&keyword=&due=&region=&place=&status=&tag=`
  )
  return <MainPage initData={data} />
}
