import { fetchServerData } from '@/api/fetchers'
import MainPage from './panel/MainPage'

export type ProjectSort = 'recent' | 'old' | 'popular'
export type ProjectType = 'studies' | 'projects'

export default async function Home() {
  const data = await fetchServerData(
    'https://27366dd1-6e95-4ec6-90c2-062a85a79dfe.mock.pstmn.io/projects-sort-recent',
  )
  return <MainPage initData={data} />
}
