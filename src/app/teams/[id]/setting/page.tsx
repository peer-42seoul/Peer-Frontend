'use client'

import { useRouter } from 'next/navigation'
import { Button, Card, Stack, Typography } from '@mui/material'
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
import useSocket from '@/states/useSocket'
import Tutorial from '@/components/Tutorial'
import TeamMemberTutorial from '@/components/tutorialContent/TeamMemberTutorial'

export interface IMyInfo {
  userId: string
  teamId: string
  teamName: string
  yourRole: string
}

const TeamsSetupPage = ({ params }: { params: { id: string } }) => {
  const { socket } = useSocket()
  const axiosWithAuth = useAxiosWithAuth()
  const [showApplicant, setShowApplicant] = useState<boolean>(false)
  const [myInfo, setMyInfo] = useState<IMyInfo>()
  const { data, error, isLoading } = useSWR<ITeam>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/${params.id}`,
    (url: string) => axiosWithAuth(url).then((res) => res.data),
  )
  const router = useRouter()

  const openApplicant = () => setShowApplicant(true)
  const closeApplicant = () => setShowApplicant(false)

  useEffect(() => {
    if (!socket) return
    socket.emit(
      'whoAmI',
      {
        teamId: params.id,
        teamName: data?.team.name,
      },
      (data: any) => {
        setMyInfo(data)
      },
    )
  }, [])

  if (error) {
    if (error.status === 403) {
      alert('팀 페이지에 접근할 권한이 없습니다.')
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
    <Stack
      margin={4}
      spacing={2}
      direction={'column'}
      borderRadius={2}
      padding={2}
      width={'93%'}
    >
      <Typography>설정</Typography>
      {data ? (
        <>
          <RedirectionRecruit id={params.id} data={data} />
          <SetupInfo team={data.team} />
          {data.team.type === TeamType.PROJECT && (
            <TeamJobAdd
              teamId={params.id}
              jobList={data.job.filter((job) => job.name != 'Leader')}
              teamStatus={data.team.status}
            />
          )}
          {!showApplicant ? (
            <Card
              sx={{
                borderRadius: '1rem',
                p: '1.5rem',
                height: '20rem',
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
                    data.team.status === TeamStatus.COMPLETE ? true : false
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
                teamStatus={data.team.status}
                team={data.member}
                teamId={data.team.id}
                jobs={data.job}
                myInfo={myInfo}
              />
            </Card>
          ) : (
            <ApplicantList close={closeApplicant} teamId={data.team.id} />
          )}
        </>
      ) : (
        <CuCircularProgress color="primary" />
      )}
    </Stack>
  )
}

export default TeamsSetupPage
