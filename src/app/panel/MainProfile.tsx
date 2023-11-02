import useAxiosWithAuth from '@/api/config'
import { getFetcherWithInstance } from '@/api/fetchers'
import useAuthStore from '@/states/useAuthStore'
import { IUserProfile } from '@/types/IUserProfile'
import { Avatar, Stack, Typography } from '@mui/material'
import { AxiosInstance } from 'axios'
import useSWR from 'swr'

const MainProfile = () => {
  const axiosWithAuth = useAxiosWithAuth()
  const { isLogin } = useAuthStore()
  const { data } = useSWR<IUserProfile>(
    isLogin
      ? [`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile`, axiosWithAuth]
      : undefined,
    ([url, axiosWithAuth]) =>
      getFetcherWithInstance(url, axiosWithAuth as AxiosInstance),
  )

  return (
    <Stack
      height="150px"
      alignItems="center"
      justifyContent={'center'}
      border="1px solid black"
    >
      <Avatar
        alt="avatar"
        src={data?.profileImageUrl}
        sx={{ width: 56, height: 56 }}
      />
      {isLogin ? (
        <>
          <Typography>{data?.nickname}</Typography>
          <Typography>{data?.association}</Typography>
        </>
      ) : (
        <Typography>로그인이 필요합니다</Typography>
      )}
      {/* 업적은 2step이라 주석처리 */}
      {/* <Stack direction="row">
                <Avatar alt="avatar" src="" />
                <Stack>
                    <Typography>업적명</Typography>
                    <Typography>이 업적의 상세 설명입니다</Typography>
                </Stack>
            </Stack> */}
    </Stack>
  )
}
export default MainProfile
