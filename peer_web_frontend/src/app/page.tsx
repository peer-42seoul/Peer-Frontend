import { fetchServerData } from '@/api/fetchers'
import MainPage from './panel/MainPage'

export type ProjectSort = 'recent' | 'old' | 'popular'
export type ProjectType = 'studies' | 'projects'

export default async function Home() {
  const data = await fetchServerData(
    'https://c4f7d82c-8418-4e7e-bd40-b363bad0ef04.mock.pstmn.io/projects-sort-recent',
  )
  return <MainPage initData={data} />
}
