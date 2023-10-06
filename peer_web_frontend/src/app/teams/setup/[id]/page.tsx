'use client'

import { Stack } from '@mui/material'
import SetupPage from '../panel/SetupTeam'
import { useEffect, useState } from 'react'
import useMedia from '@/hook/useMedia'
import SetupMember from '../panel/SetupMember'

/**
 * 
 * 
{
  team: {
    id : string,
    name: string,
    dueTo: string,
    operationForm: string,
    region: string[ 1, 2, 3 ]
  }, 
  member: [
      name: string,
      id: string,
      grant: boolean,
    }, ...
  ]
}
 */

export interface IMember {
  name: string
  id: string
  grant: boolean
}

export interface ITeam {
  team: {
    id: string
    type: string
    name: string
    dueTo: string
    operationForm: string
    region: string[]
  }
  member: IMember[]
}

const mockdata: ITeam = {
  team: {
    id: '0',
    name: '프로젝트 1',
    type: '프로젝트',
    dueTo: '2021-10-10',
    operationForm: '온라인',
    region: ['서울', '경기', '인천'],
  },
  member: [
    {
      name: '김철수',
      id: '123',
      grant: true,
    },
    {
      name: '김철수',
      id: '123',
      grant: true,
    },
    {
      name: '김철수',
      id: '123',
      grant: true,
    },
    {
      name: '김철수',
      id: '123',
      grant: true,
    },
  ],
}

const TeamsSetupPage = ({ params }: { params: { id: string } }) => {
  const { isPc } = useMedia()
  const { id } = params
  const [team, setTeam] = useState<ITeam>()

  useEffect(() => {
    setTeam(mockdata)
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
      {team && <SetupMember team={team.member} />}
      {!team && <div>팀을 선택해주세요</div>}
    </Stack>
  )
}

export default TeamsSetupPage
