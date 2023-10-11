'use client'

import useMedia from '@/hook/useMedia'
import { Stack, Typography } from '@mui/material'
import TeamSidebar from '../panel/TeamSidebar'
import useShowTeamCategory from '@/states/useShowTeamCategory'
import { ReactNode } from 'react'

interface TeamLayoutProps {
  main: ReactNode
  notice: ReactNode
  borad: ReactNode
  setting: ReactNode
}

const TeamLayout = (props: TeamLayoutProps) => {
  const { isPc } = useMedia()
  const { showTeamPageCategory } = useShowTeamCategory()
  return (
    <Stack display="flex" padding={1} spacing={2}>
      <Stack textAlign="center">
        <Typography fontWeight="bold">나의 팀페이지</Typography>
      </Stack>
      <Stack spacing={2} direction={isPc ? 'row' : 'column'}>
        <TeamSidebar />
        {showTeamPageCategory === '메인' && props.main}
        {showTeamPageCategory === '공지사항' && props.notice}
        {showTeamPageCategory === '게시판' && props.borad}
        {showTeamPageCategory === '팀 설정' && props.setting}
      </Stack>
    </Stack>
  )
}

export default TeamLayout
