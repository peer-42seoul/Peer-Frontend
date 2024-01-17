'use client'
import { Stack, Typography } from '@mui/material'
import UserInfoEdit from './panel/UserInfoEdit'
import UserWithdrawalModal from './panel/UserWithdrawalModal'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import { useState } from 'react'
import useToast from '@/hook/useToast'
import IToastProps from '@/types/IToastProps'
import useMedia from '@/hook/useMedia'
import * as pageStyle from '../panel/my-page.style'
import TitleBox from '@/components/TitleBox'

const PrivacyPage = () => {
  const axiosWithAuth = useAxiosWithAuth()
  const { data, error, isLoading } = useSWR('/api/v1/info', (url: string) =>
    axiosWithAuth.get(url).then((res) => res.data),
  )
  const { isPc } = useMedia()

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
    <Stack
      spacing={isPc ? 4 : 3}
      sx={isPc ? pageStyle.pagePcStyle : pageStyle.pageMobileStyle}
    >
      <TitleBox title="개인정보">
        <Stack spacing={1}>
          <Typography variant="CaptionEmphasis" color="text.strong">
            이름
          </Typography>
          <Typography variant="Body2" color="text.alternative">
            {name}
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="CaptionEmphasis" color="text.strong">
            이메일
          </Typography>
          <Typography variant="Body2" color="text.alternative">
            {email}
          </Typography>
        </Stack>
        <UserInfoEdit
          local={local}
          authenticationFt={authenticationFt}
          authenticationGoogle={authenticationGoogle}
          setToastProps={setToastProps}
          openToast={openToast}
        />
      </TitleBox>
      <TitleBox title={'계정 관리'}>
        <Stack spacing={1} direction={'row'} justifyContent={'space-between'}>
          <Typography variant="Body2" color="text.alternative">
            계정을 삭제하시면....
          </Typography>
          <UserWithdrawalModal
            setToastProps={setToastProps}
            openToast={openToast}
          />
        </Stack>
      </TitleBox>
      <CuToast
        open={isOpen}
        onClose={closeToast}
        severity={toastProps.severity}
        message={toastProps.message}
      />
    </Stack>
  )
}

export default PrivacyPage
