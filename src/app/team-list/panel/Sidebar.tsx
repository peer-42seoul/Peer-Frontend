'use client'

import { TeamStatus } from '@/app/teams/types/types'
import CuNavBar from '@/components/CuNavBar'
import useShowTeams from '@/states/useShowTeams'
import { useEffect, useState } from 'react'

const Sidebar = () => {
  const [alignment, setAlignment] = useState(TeamStatus.RECRUITING)
  const { setShowTeams } = useShowTeams()

  const handleChange = (event: any, newAlignment: any) => {
    setAlignment(newAlignment)
  }
  const onClickGather = () => {
    handleChange(null, TeamStatus.RECRUITING)
    setShowTeams(TeamStatus.RECRUITING)
  }
  const onClickBefore = () => {
    handleChange(null, TeamStatus.BEFORE)
    setShowTeams(TeamStatus.BEFORE)
  }
  const onClickProgress = () => {
    handleChange(null, TeamStatus.ONGOING)
    setShowTeams(TeamStatus.ONGOING)
  }
  const onClickComplete = () => {
    handleChange(null, TeamStatus.COMPLETE)
    setShowTeams(TeamStatus.COMPLETE)
  }

  useEffect(() => {
    setShowTeams(alignment)
  }, [alignment, setShowTeams])
  useEffect(() => {
    setShowTeams(alignment)
  }, [setShowTeams])

  const getTabValue = () => alignment

  return (
    <CuNavBar
      getTabValue={getTabValue}
      title={'나의 팀리스트'}
      tabData={[
        {
          label: '모집 중',
          value: TeamStatus.RECRUITING,
          onClick: onClickGather,
          icon: <></>,
        },
        {
          label: '시작 전',
          value: TeamStatus.BEFORE,
          onClick: onClickBefore,
          icon: <></>,
        },
        {
          label: '진행 중',
          value: TeamStatus.ONGOING,
          onClick: onClickProgress,
          icon: <></>,
        },
        {
          label: '진행 완료',
          value: TeamStatus.COMPLETE,
          onClick: onClickComplete,
          icon: <></>,
        },
      ]}
    />
  )
}

export default Sidebar
