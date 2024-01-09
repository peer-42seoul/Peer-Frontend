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
    <Stack padding={1} spacing={2} px={isPc ? 10 : 1}>
      <Stack
        display="flex"
        spacing={'4rem'}
        direction={isPc ? 'row' : 'column'}
        justifyContent={'center'}
      >
        {layout === 'SIDEBAR' && (
          <Stack borderRadius={2} flex={1}>
            <TeamSidebar id={id} />
          </Stack>
        )}
        <Stack
          spacing={2}
          flex={'auto'}
          borderRadius={2}
          width="100%"
          maxWidth="56.75rem"
        >
          {children}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default TeamLayout
