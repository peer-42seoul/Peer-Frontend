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
import CuCircularProgress from '@/components/CuCircularProgress'

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
    `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/team/list?teamStatus=${showTeams}`,
    (url: string) => axiosInstance(url).then((res) => res.data),
  )

  if (isLoading) return <CuCircularProgress color="primary" />

  if (!data)
    return (
      <Stack spacing={1} sx={{ p: 1 }} flex={4} borderRadius={2}>
        <NoDataDolphin message="팀이 없습니다." />
      </Stack>
    )

  return <TeamsList prop={data} />
}

export default TeamsListPage
