'use client'

import { ReactNode, useEffect } from 'react'
import { Stack, Container, Box, useMediaQuery } from '@mui/material'
import useTeamPageState from '@/states/useTeamPageState'
import TeamSidebar from './panel/NavBar'
import * as style from '@/components/NavBarLayout.style'

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

  const isFourRow = useMediaQuery('(min-width:997px)')

  return (
    <Container sx={style.container}>
      <Stack
        justifyContent={'space-between'}
        direction={isFourRow ? 'row' : 'column'}
        alignItems={isFourRow ? 'flex-start' : 'center'}
        sx={style.stack}
      >
        {layout === 'SIDEBAR' && <TeamSidebar id={id} />}
        <Box sx={style.contentBox}>{children}</Box>
      </Stack>
    </Container>
  )
}

export default TeamLayout
