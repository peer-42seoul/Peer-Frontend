import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { Avatar, Stack, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuCircularProgress from '@/components/CuCircularProgress'
import { ITeamInfo } from '@/types/ITeamInfo'
import { StatusIcon, IconInfo } from './TeamInfoComponent'
import { useEffect } from 'react'
import useHeaderStore from '@/states/useHeaderStore'

const defaultLogoPath = '/images/profile.jpeg' // TODO : 기본 로고 path 확인하기

const TeamInfoContainer = ({ id }: { id: number }) => {
  const axiosInstance = useAxiosWithAuth()
  const { data, error, isLoading } = useSWR<ITeamInfo>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/main/${id}`,
    (url: string) => axiosInstance(url).then((res) => res.data),
  )
  const { setHeaderTitle } = useHeaderStore()
  const router = useRouter()

  // set header
  useEffect(() => {
    if (data) {
      setHeaderTitle(data.name)
    }
    return () => {
      setHeaderTitle('')
    }
  }, [data])

  if (error) {
    if (error.status === 403) alert('팀 페이지에 접근할 권한이 없습니다.')
    else if (error.status === 404) alert('팀 페이지가 존재하지 않습니다.')
    else alert('팀 페이지에 접근할 수 없습니다.')
    router.push('/team-list')
    return <CuCircularProgress color={'primary'} />
  }

  if (!isLoading && !data) {
    alert('팀 페이지에 접근할 수 없습니다.')
    router.push('/team-list')
    return <CuCircularProgress color={'primary'} />
  }

  return (
    <>
      <Stack direction={'row'} spacing={1}>
        {isLoading || !data ? (
          <CuCircularProgress color={'primary'} />
        ) : (
          <>
            <Avatar
              alt="team logo"
              variant="rounded"
              sx={{ width: 89, height: 92, border: 1, borderRadius: 1.2 }}
              src={
                data.teamPicturePath ? data.teamPicturePath : defaultLogoPath
              }
            />
            <Stack>
              <Stack direction={'row'}>
                <Typography variant="h5">{data.name}</Typography>
                <StatusIcon status={data.status} />
              </Stack>
              <Stack direction={'row'}>
                <IconInfo type="MEMBER" text={data.memberCount.toString()} />
                <IconInfo type="LEADER" text={data.leaderName} />
                <IconInfo type="DATE" text={data.createdAt} />
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </>
  )
}

export default TeamInfoContainer
