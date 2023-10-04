'use client'

import TeamsList from './panel/TeamsList'
import { useEffect, useState } from 'react'
import useShowTeams from '@/states/useShowTeams'

export interface ITeamInfo {
  id: string
  type: 'project' | 'study'
  status: '모집 중' | '시작 전' | '진행 중' | '진행 완료'
  name: string
  deadline: string
  members: string[]
  location: string
  activity: string
}

export const mockdata: ITeamInfo[] = [
  {
    id: '0',
    type: 'study',
    status: '진행 중',
    name: '프로젝트 1',
    deadline: '2021-10-10',
    members: ['김철수', '홍길동'],
    location: '온라인',
    activity: '매주 목요일 19:00',
  },
  {
    id: '1',
    type: 'project',
    status: '진행 중',
    name: '프로젝트 1',
    deadline: '2021-10-10',
    members: ['김철수', '홍길동'],
    location: '오프라인',
    activity: '매주 수요일 19:00',
  },
  {
    id: '2',
    type: 'study',
    status: '진행 중',
    name: '프로젝트 2',
    deadline: '2021-10-10',
    members: ['김철수', '홍길동'],
    location: '오프라인',
    activity: '매주 수요일 19:00',
  },
  {
    id: '3',
    type: 'study',
    status: '모집 중',
    name: '프로젝트 3',
    deadline: '2021-10-10',
    members: ['김철수', '홍길동'],
    location: '오프라인',
    activity: '매주 수요일 19:00',
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
