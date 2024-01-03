'use client'

import { Button, Card, Stack, Typography } from '@mui/material'
import SetupPage from './panel/SetupTeam'
import { useState } from 'react'
import SetupMember from './panel/SetupMember'
import ApplicantList from './panel/ApplicantList'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import { ITeam, TeamType } from '../../types/types'
import RedirectionRecruit from './panel/RedirectionRecruit'
import TeamJobAdd from './panel/TeamJobAdd'

const TeamsSetupPage = ({ params }: { params: { id: string } }) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [showApplicant, setShowApplicant] = useState<boolean>(false)
  const { data, isLoading } = useSWR<ITeam>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/${params.id}`,
    (url: string) => axiosWithAuth(url).then((res) => res.data),
  )

  const openApplicant = () => setShowApplicant(true)
  const closeApplicant = () => setShowApplicant(false)

  if (isLoading) return <Typography>로딩중</Typography>

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
          <SetupPage team={data.team} />
          {data.team.type === TeamType.PROJECT && (
            <TeamJobAdd teamId={params.id} />
          )}
          {!showApplicant ? (
            <>
              <Card
                sx={{
                  borderRadius: '1rem',
                  p: '1.5rem',
                  height: 400,
                }}
              >
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Typography fontWeight="bold">팀원 목록</Typography>

                  <Button
                    onClick={openApplicant}
                    sx={{ mt: '0.5rem', width: '9rem' }}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    신청 대기자 보기
                  </Button>
                </Stack>
                <SetupMember team={data.member} teamId={data.team.id} />
              </Card>
            </>
          ) : (
            <ApplicantList close={closeApplicant} teamId={data.team.id} />
          )}
        </>
      ) : (
        <>
          <Typography>데이터가 없습니다.</Typography>
        </>
      )}
    </Stack>
  )
}

export default TeamsSetupPage
