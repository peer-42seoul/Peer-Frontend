'use client'

import TeamsList from './panel/TeamsList'
import useShowTeams from '@/states/useShowTeams'
import useSWR from 'swr'
import { Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import {
  TeamStatus,
  TeamType,
  TeamOperationForm,
} from '@/app/teams/types/types'

export interface ITeamInfo {
  id: string
  name: string
  dueTo: string
  type: TeamType
  status: TeamStatus
  myRole: boolean
  region: string
  operationFormat: TeamOperationForm
}

const TeamsListPage = () => {
  const { showTeams } = useShowTeams()
  const axiosInstance = useAxiosWithAuth()
  const { data, isLoading } = useSWR<ITeamInfo[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/list?teamStatus=${showTeams}`,
    (url: string) => axiosInstance(url).then((res) => res.data),
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
