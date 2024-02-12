'use client'

import { Container, Stack, Box, Typography } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import ForceTutorial from '@/components/ForceTutorial'
import { TeamListTutorial } from '@/components/tutorialContent/TeamListTutorial'
import useShowTeams from '@/states/useShowTeams'
import { TeamStatus } from '@/app/teams/types/types'

import Sidebar from './panel/Sidebar'
import * as style from './layout.style'

const TeamsLayout = ({ children }: { children: ReactNode }) => {
  const { showTeams } = useShowTeams()

  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  return (
    <Container sx={style.container}>
      <Stack
        justifyContent={'space-between'}
        direction={['column', 'row']}
        sx={style.stack}
      >
        <Sidebar />
        <Stack>
          <Stack direction={'row'}>
            <Typography fontWeight={'bold'} my={'1rem'}>
              {showTeams === TeamStatus.RECRUITING
                ? '모집 중'
                : showTeams === TeamStatus.COMPLETE
                  ? '진행 완료'
                  : showTeams === TeamStatus.ONGOING
                    ? '진행 중'
                    : '모집 완료'}
            </Typography>
            <ForceTutorial
              title={'나의 팀 확인하기'}
              content={<TeamListTutorial />}
            />
          </Stack>
          <Box sx={style.contentBox}>{children}</Box>
        </Stack>
      </Stack>
    </Container>
  )
}

export default TeamsLayout
