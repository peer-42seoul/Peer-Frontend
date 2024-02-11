'use client'

import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { Button, Stack, Typography, Card } from '@mui/material'
import { useEffect, useState } from 'react'
import SetupMember from './panel/SettingTeamMember'
import ApplicantList from './panel/ApplicantList'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import { ITeam, TeamStatus, TeamType } from '../../types/types'
import RedirectionRecruit from './panel/RedirectRecruitPage'
import TeamJobAdd from './panel/SettingTeamJobs'
import SetupInfo from './panel/SettingTeamInfo'
import CuCircularProgress from '@/components/CuCircularProgress'
import Tutorial from '@/components/Tutorial'
import TeamMemberTutorial from '@/components/tutorialContent/TeamMemberTutorial'
import { socket } from '@/app/page'

export interface IMyInfo {
  userId: string
  teamId: string
  teamName: string
  yourRole: string
}

const TeamsSetupPage = ({ params }: { params: { id: string } }) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [showApplicant, setShowApplicant] = useState<boolean>(false)
  const { data, error, isLoading, mutate } = useSWR<ITeam>(
    `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/team/setting/${params.id}`,
    (url: string) => axiosWithAuth(url).then((res) => res.data),
  )
  const router = useRouter()
  const [teams, setTeams] = useState<ITeam>()

  useEffect(() => {
    if (data) {
      setTeams(data)
    }
  }, [data])

  const openApplicant = () => setShowApplicant(true)
  const closeApplicant = () => setShowApplicant(false)

  useEffect(() => {
    if (!socket) return
    console.log('socket', socket)

    socket.emit(
      'whoAmI',
      {
        teamId: params.id,
        teamName: data?.team.name,
      },
      (data: any) => {
        console.log('socket', data)
      },
    )

    return () => {
      if (!socket) return
      socket.off('whoAmI')
    }
  }, [socket])

  if (error) {
    if (isAxiosError(error) && error.response?.status === 403) {
      alert('팀 설정은 팀 리더만 가능합니다.')
    } else {
      alert('팀 페이지에 접근할 수 없습니다.')
    }
    router.push('/team-list')
    return <CuCircularProgress color="primary" />
  }

  if (!isLoading && !data) {
    alert('팀 페이지에 접근할 수 없습니다.')
    router.push('/team-list')
    return <CuCircularProgress color="primary" />
  }

  if (isLoading) return <CuCircularProgress color="primary" />

  return (
    <Stack spacing={2} direction={'column'} borderRadius={2} padding={2}>
      <Typography>설정</Typography>
      {teams ? (
        <>
          <RedirectionRecruit id={params.id} data={teams} />
          <SetupInfo team={teams.team} mutate={mutate} />
          {teams.team.type === TeamType.PROJECT && (
            <TeamJobAdd
              teamId={params.id}
              jobList={teams.job.filter((job) => job.name != 'Leader')}
              teamStatus={teams.team.status}
            />
          )}
          {!showApplicant ? (
            <Card
              sx={{
                borderRadius: '1rem',
                p: '1.5rem',
                height: '20rem',
                backgroundColor: 'background.secondary',
                backgroundImage: 'none',
              }}
            >
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={3}
              >
                <Stack direction={'row'} display={'flex'} alignItems={'center'}>
                  <Typography fontWeight="bold">팀원 목록</Typography>
                  <Tutorial content={<TeamMemberTutorial />} />
                </Stack>
                <Button
                  disabled={
                    teams.team.status === TeamStatus.COMPLETE ? true : false
                  }
                  onClick={openApplicant}
                  sx={{ width: '9rem' }}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  <Typography>신청 대기자 보기</Typography>
                </Button>
              </Stack>
              <SetupMember
                teamStatus={teams.team.status}
                team={teams.member}
                teamId={teams.team.id}
                jobs={teams.job}
              />
            </Card>
          ) : (
            <ApplicantList close={closeApplicant} teamId={teams.team.id} />
          )}
        </>
      ) : (
        <CuCircularProgress color="primary" />
      )}
    </Stack>
  )
}

export default TeamsSetupPage
