'use client'

import TeamsList from './panel/TeamsList'
import useShowTeams from '@/states/useShowTeams'
import { defaultGetFetcher } from '@/api/fetchers'
// import useAuthStore from '@/states/useAuthStore'
import useSWR from 'swr'

export interface ITeamInfo {
  id: string
  name: string
  dueTo: string
  type: 'project' | 'study'
  status: '모집 중' | '시작 전' | '진행 중' | '진행 완료'
  myRole: boolean
  region: string
  operationForm: string
}

const TeamsListPage = () => {
  const { showTeams } = useShowTeams()
  // const { userId } = useAuthStore()
  //postman 테스트용
  const { data, isLoading } = useSWR<ITeamInfo[]>(
    `https://21bf1e8a-2c5e-466f-8261-fa05ad3bde03.mock.pstmn.io/api/v1/team/list/userId=1?teamStatus=${showTeams}`,
    defaultGetFetcher,
  )
  // //실제 동작해야할 API
  // const { data, isLoading } = useSWR(
  //   `/api/v1/team/list/${userId}?teamStatus=${showTeams}`,
  //   defaultGetFetcher,
  // )

  if (isLoading) return <div>로딩중</div>
  if (!data) return <div>데이터가 없습니다.</div>

  return <TeamsList prop={data} />
}

export default TeamsListPage
