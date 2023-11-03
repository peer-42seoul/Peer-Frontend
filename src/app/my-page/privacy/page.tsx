'use client'
import { Typography } from '@mui/material'
import UserInfoEdit from './panel/UserInfoEdit'
import UserWithdrawalModal from './panel/UserWithdrawalModal'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import { useState } from 'react'
import useToast from '@/hook/useToast'
import IToastProps from '@/types/IToastProps'

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

  const { name, email, local, authentication } = data
  return (
    <>
      <Typography>이름</Typography>
      <Typography>{name}</Typography>
      <Typography>이메일</Typography>
      <Typography>{email}</Typography>
      <UserInfoEdit
        local={local}
        authentication={authentication}
        setToastProps={setToastProps}
        openToast={openToast}
      />
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
    </>
  )
}

export default PrivacyPage
