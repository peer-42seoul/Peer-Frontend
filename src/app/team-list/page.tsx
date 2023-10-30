'use client'

import TeamsList from './panel/TeamsList'
import useShowTeams from '@/states/useShowTeams'
import { defaultGetFetcher } from '@/api/fetchers'
import useSWR from 'swr'
import { Stack } from '@mui/material'
// import useAuthStore from '@/states/useAuthStore'

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
  const userId = 1

  //실제 동작해야할 API
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/list/${userId}?teamStatus=${showTeams}`,
    defaultGetFetcher,
  )

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
