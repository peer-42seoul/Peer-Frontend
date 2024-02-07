'use client'
import { Stack, Typography } from '@mui/material'
// import UserWithdrawalModal from './panel/UserWithdrawalModal'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import useMedia from '@/hook/useMedia'
import * as pageStyle from '../panel/my-page.style'
import TitleBox from '@/components/TitleBox'
import AuthSettingSection from './panel/AuthSettingSection'
import InfoDisplaySection from './panel/InfoDisplaySection'
import PasswordChangeSection from './panel/PasswordChangeSection'

const PrivacyPage = () => {
  const axiosWithAuth = useAxiosWithAuth()
  const { data, error, isLoading } = useSWR('/api/v1/info', (url: string) =>
    axiosWithAuth.get(url).then((res) => res.data),
  )
  const { isPc } = useMedia()

  if (error) return <Typography>데이터 조회에 실패했습니다.</Typography>
  if (isLoading) return <Typography>로딩중입니다...</Typography>
  if (!data) return <Typography>데이터가 없습니다.</Typography>

  const { name, email, authenticationFt, authenticationGoogle } = data
  return (
    <Stack
      spacing={isPc ? 4 : 3}
      sx={isPc ? pageStyle.pagePcStyle : pageStyle.pageMobileStyle}
    >
      <TitleBox title="개인정보">
        <InfoDisplaySection infoTitle={'이름'} info={name} />
        <InfoDisplaySection infoTitle={'아이디 (이메일)'} info={email} />
        <AuthSettingSection
          authorized={authenticationFt}
          authenticationTitle="42계정"
          authenticatedContent={authenticationFt}
          href={`${process.env.NEXT_PUBLIC_CSR_API}/oauth2/authorization/ft`}
        />
        <AuthSettingSection
          authorized={authenticationGoogle}
          authenticationTitle="구글 계정"
          authenticatedContent={authenticationGoogle}
          href={`${process.env.NEXT_PUBLIC_CSR_API}/oauth2/authorization/google`}
        />
        <PasswordChangeSection />
      </TitleBox>
      {/* 백엔드에서 탈퇴하기 기능 컴포넌트를 숨겨달라는 요청이 들어와서 주석처리 하였습니다. */}
      {/* <TitleBox title={'계정 관리'}>
        <Stack spacing={1} direction={'row'} justifyContent={'space-between'}>
          <Typography variant="Body2" color="text.alternative">
            계정을 삭제하시면....
          </Typography>
          <UserWithdrawalModal />
        </Stack>
      </TitleBox> */}
    </Stack>
  )
}

export default PrivacyPage
