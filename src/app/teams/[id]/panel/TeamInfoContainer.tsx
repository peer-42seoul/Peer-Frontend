import useSWR from 'swr'
import { Avatar, Stack, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
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

  // set header
  useEffect(() => {
    if (data) {
      setHeaderTitle(data.name)
    }
    return () => {
      setHeaderTitle('')
    }
  }, [data])

  if (isLoading) {
    return <Typography>로딩중...</Typography>
  }

  if (error || !data) {
    switch (error?.status) {
      case 403:
        return <Typography>권한이 없습니다.</Typography>
      case 404:
        return <Typography>존재하지 않는 팀입니다.</Typography>
      default:
        return <Typography>에러가 발생했습니다.</Typography>
    }
  }

  return (
    <>
      <Stack direction={'row'} spacing={1}>
        <Avatar
          alt="team logo"
          variant="rounded"
          sx={{ width: 89, height: 92, border: 1, borderRadius: 1.2 }}
          src={data.teamPicturePath ? data.teamPicturePath : defaultLogoPath}
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
      </Stack>
    </>
  )
}

export default TeamInfoContainer
