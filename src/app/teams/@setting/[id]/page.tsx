'use client'

import { Button, Stack, Typography } from '@mui/material'
import SetupPage from './panel/SetupTeam'
import { useState } from 'react'
import SetupMember from './panel/SetupMember'
import ApplicantList from './panel/ApplicantList'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import useAxiosWithAuth from '@/api/config'
import { ITeam } from '../../types/types'
import RedirectionRecruit from './panel/RedirectionRecruit'

const TeamsSetupPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const axiosInstance = useAxiosWithAuth()
  const [showApplicant, setShowApplicant] = useState<boolean>(false)
  const { data, isLoading } = useSWR<ITeam>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/${params.id}`,
    (url: string) => axiosInstance(url).then((res) => res.data),
  )

  const openApplicant = () => setShowApplicant(true)
  const closeApplicant = () => setShowApplicant(false)

  if (isLoading) return <Typography>로딩중</Typography>

  return (
    <Stack
      margin={4}
      spacing={2}
      direction={'column'}
      flex={4}
      border="1px solid"
      borderRadius={2}
      padding={2}
    >
      <Typography>설정</Typography>
      {data ? (
        <>
          <RedirectionRecruit id={params.id} data={data} />
          <SetupPage team={data.team} />
          {!showApplicant ? (
            <>
              <SetupMember team={data.member} teamId={data.team.id} />
              <Button
                onClick={openApplicant}
                sx={{ mt: 1 }}
                variant="contained"
                color="primary"
                fullWidth
              >
                신청 대기자 보기
              </Button>
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
      <Button
        variant="outlined"
        onClick={() => router.push(`/recruit/${params.id}`)}
      >
        모집 글 보기
      </Button>
    </Stack>
  )
}

export default TeamsSetupPage
