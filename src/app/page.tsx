import { fetchServerData } from '@/api/fetchers'
import MainPage from './panel/MainPage'

export default async function Home() {
  const data = await fetchServerData(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=STUDY&sort=latest&page=1&pageSize=1&keyword=&due=&region1=&region2=&place=&status=&tag=`,
  )
  console.log("data", data)
  return <MainPage initData={data} />
}
