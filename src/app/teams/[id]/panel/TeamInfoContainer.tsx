import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { useEffect } from 'react'
import { Stack, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuCircularProgress from '@/components/CuCircularProgress'
import CuAvatar from '@/components/CuAvatar'
import useHeaderStore from '@/states/useHeaderStore'
import { ITeamInfo } from '@/types/ITeamInfo'
import { StatusIcon, IconInfo } from './TeamInfoComponent'
import * as style from './TeamInfoContainer.style'

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
      <Stack direction={'row'} spacing={'1rem'}>
        {isLoading || !data ? (
          <CuCircularProgress color={'primary'} />
        ) : (
          <>
            <CuAvatar
              alt="team logo"
              variant="rounded"
              sx={style.teamAvatar}
              src={data.teamPicturePath ? data.teamPicturePath : undefined}
            />
            <Stack>
              <Stack direction={'row'} spacing={'0.5rem'}>
                <Typography variant="h5">{data.name}</Typography>
                <StatusIcon status={data.status} />
              </Stack>
              <Stack direction={'row'} spacing={'0.5rem'}>
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
