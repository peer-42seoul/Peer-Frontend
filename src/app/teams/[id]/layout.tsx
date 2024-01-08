'use client'

import { ReactNode, useEffect } from 'react'
import { Stack } from '@mui/material'
import useTeamPageState from '@/states/useTeamPageState'
import useMedia from '@/hook/useMedia'
import TeamSidebar from './panel/NavBar'

const TeamLayout = ({
  params,
  children,
}: {
  params: { id: string }
  children: ReactNode
}) => {
  const { isPc } = useMedia()
  const { layout, resetState } = useTeamPageState()
  const id = params.id

  useEffect(() => {
    return () => {
      resetState()
    }
  }, [])

  return (
    <Stack display="flex" padding={1} spacing={2} px={isPc ? 10 : 1}>
      <Stack
        spacing={'4rem'}
        direction={isPc ? 'row' : 'column'}
        justifyContent={'center'}
      >
        {layout === 'SIDEBAR' && (
          <Stack borderRadius={2} maxWidth="19.25rem">
            <TeamSidebar id={id} />
          </Stack>
        )}
        <Stack
          spacing={2}
          direction={isPc ? 'row' : 'column'}
          flex={4}
          borderRadius={2}
          width={'100%'}
          maxWidth="56.75rem"
        >
          {children}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default TeamLayout
