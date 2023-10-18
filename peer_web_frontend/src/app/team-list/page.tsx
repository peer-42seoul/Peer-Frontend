'use client'

import TeamsList from './panel/TeamsList'
import useShowTeams from '@/states/useShowTeams'
import { defaultGetFetcher } from '@/api/fetchers'
// import useAuthStore from '@/states/useAuthStore'
import useSWR from 'swr'
import { Stack } from '@mui/material'

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
    `https://c4f7d82c-8418-4e7e-bd40-b363bad0ef04.mock.pstmn.io/api/v1/team/list/userId=1?teamStatus=${showTeams}`,
    defaultGetFetcher,
  )
  // //실제 동작해야할 API
  // const { data, isLoading } = useSWR(
  //   `/api/v1/team/list/${userId}?teamStatus=${showTeams}`,
  //   defaultGetFetcher,
  // )

  if (isLoading)
    return (
      <Stack
        spacing={1}
        sx={{ p: 1 }}
        flex={4}
        border="1px solid"
        borderRadius={2}
      >
        로딩 중...
      </Stack>
    )
  if (!data)
    return (
      <Stack
        spacing={1}
        sx={{ p: 1 }}
        flex={4}
        border="1px solid"
        borderRadius={2}
      >
        데이터가 없습니다.
      </Stack>
    )

  return <TeamsList prop={data} />
}

export default TeamsListPage
