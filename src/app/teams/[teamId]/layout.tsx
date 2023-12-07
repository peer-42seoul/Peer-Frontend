'use client'

import { ReactNode } from 'react'
import useMedia from '@/hook/useMedia'
import { Stack, Typography } from '@mui/material'
import TeamSidebar from './panel/TeamSidebar'

const TeamLayout = ({
  params,
  children,
}: {
  params: { teamId: string }
  children: ReactNode
}) => {
  const { isPc } = useMedia()
  const teamId = params.teamId

  return (
    <Stack display="flex" padding={1} spacing={2} px={isPc ? 10 : 1}>
      <Stack textAlign="center">
        <Typography fontWeight="bold">나의 팀페이지</Typography>
      </Stack>
      <Stack spacing={2} direction={isPc ? 'row' : 'column'}>
        <TeamSidebar teamId={teamId} />
        <Stack
          spacing={2}
          direction={isPc ? 'row' : 'column'}
          flex={4}
          borderRadius={2}
        >
          {children}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default TeamLayout
