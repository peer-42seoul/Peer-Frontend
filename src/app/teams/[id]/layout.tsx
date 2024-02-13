'use client'

import { ReactNode, useEffect } from 'react'
import { Stack, Container, Box, useMediaQuery } from '@mui/material'
import useTeamPageState from '@/states/useTeamPageState'
import TeamSidebar from './panel/NavBar'
import * as style from '@/components/NavBarLayout.style'
import useMedia from '@/hook/useMedia'

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
    resetState()
    return () => {
      resetState()
    }
  }, [])

  const isFourRow = useMediaQuery('(min-width:997px)')
  const { isPc } = useMedia()

  if (layout === 'FULLPAGE') {
    return (
      <Container sx={style.container}>
        <Box sx={style.fullPageContentBox}>{children}</Box>
      </Container>
    )
  }

  return (
    <Container sx={style.container}>
      <Stack
        justifyContent={'space-between'}
        direction={isFourRow ? 'row' : 'column'}
        alignItems={isFourRow ? 'flex-start' : 'center'}
        sx={style.stack}
      >
        <TeamSidebar id={id} />
        <Box sx={{ ...style.contentBox, width: isPc ? undefined : '100%' }}>
          {children}
        </Box>
      </Stack>
    </Container>
  )
}

export default TeamLayout
