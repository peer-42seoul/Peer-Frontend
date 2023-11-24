'use client'
import { Stack, Typography } from '@mui/material'
import UserInfoEdit from './panel/UserInfoEdit'
import UserWithdrawalModal from './panel/UserWithdrawalModal'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import { useState } from 'react'
import useToast from '@/hook/useToast'
import IToastProps from '@/types/IToastProps'

const PrivacyStack = {
  padding: '24px',
  borderRadius: '16px',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '24px',
  alignSelf: 'stretch',
}

const PrivacyPage = () => {
  const axiosWithAuth = useAxiosWithAuth()
  const { data, error, isLoading } = useSWR('/api/v1/info', (url: string) =>
    axiosWithAuth.get(url).then((res) => res.data),
  )

  const [toastProps, setToastProps] = useState<IToastProps>({
    severity: 'info',
    message: '',
  })
  const { CuToast, isOpen, openToast, closeToast } = useToast()

  if (error) return <Typography>데이터 조회에 실패했습니다.</Typography>
  if (isLoading) return <Typography>로딩중입니다...</Typography>
  if (!data) return <Typography>데이터가 없습니다.</Typography>

  const { name, email, local, authenticationFt, authenticationGoogle } = data
  return (
    <>
      <Stack sx={PrivacyStack}>
        <Typography>개인 정보</Typography>
        <Stack>
          <Typography>이름</Typography>
          <Typography>{name}</Typography>
        </Stack>
        <Stack>
          <Typography>이메일</Typography>
          <Typography>{email}</Typography>
        </Stack>
        <UserInfoEdit
          local={local}
          authenticationFt={authenticationFt}
          authenticationGoogle={authenticationGoogle}
          setToastProps={setToastProps}
          openToast={openToast}
        />
      </Stack>
      <Stack sx={PrivacyStack}>
        <Typography>계정관리</Typography>
        <UserWithdrawalModal
          setToastProps={setToastProps}
          openToast={openToast}
        />
        <CuToast
          open={isOpen}
          onClose={closeToast}
          severity={toastProps.severity}
        >
          <Typography>{toastProps.message}</Typography>
        </CuToast>
      </Stack>
    </>
  )
}

export default PrivacyPage
