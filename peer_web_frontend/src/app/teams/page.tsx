'use client'

import TeamsList from './panel/TeamsList'
import { useEffect, useState } from 'react'
import useShowTeams from '@/states/useShowTeams'

/**
 * {
  id: string,
  name: string,
  dueTo: string,
  type: 'project' | 'study'
  status: string,
  myRole: boolean,
  teamCount: 
  region: string,
  operationForm: string
}
 * 
 */
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

export const mockdata: ITeamInfo[] = [
  {
    id: '0',
    type: 'study',
    status: '진행 중',
    name: '프로젝트 1',
    dueTo: '2021-10-10',
    myRole: true,
    region: '온라인',
    operationForm: '매주 목요일 19:00',
  },
  {
    id: '1',
    type: 'project',
    status: '진행 중',
    name: '프로젝트 1',
    dueTo: '2021-10-10',
    myRole: false,
    region: '오프라인',
    operationForm: '매주 수요일 19:00',
  },
  {
    id: '2',
    type: 'study',
    status: '진행 중',
    name: '프로젝트 2',
    dueTo: '2021-10-10',
    myRole: false,
    region: '오프라인',
    operationForm: '매주 수요일 19:00',
  },
  {
    id: '3',
    type: 'study',
    status: '모집 중',
    name: '프로젝트 3',
    dueTo: '2021-10-10',
    myRole: false,
    region: '오프라인',
    operationForm: '매주 수요일 19:00',
  },
]

const TeamsListPage = () => {
  const { showTeams } = useShowTeams()
  const [showList, setShowList] = useState<ITeamInfo[]>([])

  useEffect(() => {
    const list = mockdata.filter((team) => team.status === showTeams)
    setShowList(list)
  }, [showTeams])

  return <TeamsList prop={showList} />
}

export default TeamsListPage
