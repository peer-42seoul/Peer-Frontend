import { fetchServerData } from '@/api/fetchers'
import MainPage from './panel/MainPage'

export type ProjectSort = 'recent' | 'old' | 'popular'
export type ProjectType = 'study' | 'project'

export default async function Home() {
  const data = await fetchServerData('http://localhost:3001/recent')
  return <MainPage data={data} />
}
