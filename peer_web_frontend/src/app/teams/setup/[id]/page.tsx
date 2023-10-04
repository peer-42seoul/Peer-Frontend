'use client'

import { Stack } from '@mui/material'
import SetupPage from '../panel/SetupTeam'
import { ITeamInfo } from '../../page'
import { useEffect, useState } from 'react'
import { mockdata } from '../../page'
import useMedia from '@/hook/useMedia'
import SetupMember from '../panel/SetupMember'

const TeamsSetupPage = ({ params }: { params: { id: string } }) => {
  const { isPc } = useMedia()
  const { id } = params
  const [team, setTeam] = useState<ITeamInfo>()

  useEffect(() => {
    console.log(id)
    const team = mockdata.find((team) => team.id === id)
    console.log(team)
    setTeam(team)
  }, [team, id])

  return (
    <Stack
      margin={4}
      spacing={2}
      direction={isPc ? 'row' : 'column'}
      flex={4}
      border="1px solid"
      borderRadius={2}
      padding={2}
    >
      {team && <SetupPage team={team} />}
      {team && <SetupMember team={team} />}
      {!team && <div>팀을 선택해주세요</div>}
    </Stack>
  )
}

export default TeamsSetupPage
