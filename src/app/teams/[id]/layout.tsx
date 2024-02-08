'use client'

import { ReactNode, useEffect } from 'react'
import { Stack, Container, Box } from '@mui/material'
import useTeamPageState from '@/states/useTeamPageState'

import TeamSidebar from './panel/NavBar'
import * as style from './layout.style'

const TeamLayout = ({
  params,
  children,
}: {
  params: { id: string }
  children: ReactNode
}) => {
  const { layout, resetState } = useTeamPageState()
  const id = params.id

  useEffect(() => {
    return () => {
      resetState()
    }
  }, [])

  return (
    <Container sx={style.container}>
      <Stack
        justifyContent={'space-between'}
        direction={['column', 'row']}
        sx={style.stack}
      >
        {layout === 'SIDEBAR' && <TeamSidebar id={id} />}
        <Box sx={style.contentBox}>{children}</Box>
      </Stack>
    </Container>
  )
}

export default TeamLayout
