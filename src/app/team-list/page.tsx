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
import NoDataDolphin from '@/components/NoDataDolphin'
import Loading from '@/components/Loading'

export interface ITeamInfo {
  id: string
  name: string
  dueTo: string
  type: TeamType
  status: TeamStatus
  region: string
  operationFormat: TeamOperationForm
  isApproved: boolean
  role: string[]
}

const TeamsListPage = () => {
  const { showTeams } = useShowTeams()
  const axiosInstance = useAxiosWithAuth()
  const { data, isLoading } = useSWR<ITeamInfo[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/list?teamStatus=${showTeams}`,
    (url: string) => axiosInstance(url).then((res) => res.data),
  )

  const test = true

  if (test) {
    return <Loading />
  }

  if (isLoading)
    return (
      <Stack spacing={1} sx={{ p: 1 }} flex={4} borderRadius={2}>
        로딩 중...
      </Stack>
    )

  if (!data)
    return (
      <Stack spacing={1} sx={{ p: 1 }} flex={4} borderRadius={2}>
        <NoDataDolphin message="팀이 없습니다." />
      </Stack>
    )

  return <TeamsList prop={data} />
}

export default TeamsListPage
