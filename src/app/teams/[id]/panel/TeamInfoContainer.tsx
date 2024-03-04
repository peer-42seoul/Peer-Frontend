import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { useEffect } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuCircularProgress from '@/components/CuCircularProgress'
import CuAvatar from '@/components/CuAvatar'
import useHeaderStore from '@/states/useHeaderStore'
import { ITeamInfo } from '@/types/ITeamInfo'
import { StatusIcon, IconInfo } from './TeamInfoComponent'
import * as style from './TeamInfoContainer.style'
import { isAxiosError } from 'axios'

const TeamInfoContainer = ({ id }: { id: number }) => {
  const axiosInstance = useAxiosWithAuth()
  const { data, error, isLoading } = useSWR<ITeamInfo>(
    `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/team/main/${id}`,
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
    if (isAxiosError(error) && error.response?.status === 403)
      alert('팀 페이지에 접근할 권한이 없습니다.')
    else if (isAxiosError(error) && error.response?.status === 404)
      alert('팀 페이지가 존재하지 않습니다.')
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
              src={
                data.teamPicturePath
                  ? data.teamPicturePath
                  : '/icons/ios/128.png'
              }
            />
            <Stack spacing={'1rem'}>
              <Stack alignItems={'center'} direction={'row'} spacing={'0.5rem'}>
                <Typography variant="Title3">{data.name}</Typography>
                <StatusIcon status={data.status} />
              </Stack>
              <Stack>
                <IconInfo type="DATE" text={data.createdAt} />
                <IconInfo type="LEADER" text={data.leaderName} />
                <Stack direction={'row'} spacing={'0.5rem'}>
                  <IconInfo type="MEMBER" text={data.memberCount.toString()} />
                  <Button>
                    <Typography variant="Caption">멤버 보기</Typography>
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </>
  )
}

export default TeamInfoContainer
