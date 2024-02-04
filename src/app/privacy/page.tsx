'use client'
import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import {
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useAuthStore from '@/states/useAuthStore'
import BoxBase from '@/components/BoxBase'
import PrivacyPolicy from './panel/PrivacyPolicy'

const PCSignupBox = {
  display: 'flex',
  position: 'relative',
  width: '544px',
  padding: '40px 64px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '48px',
}

const MobileSignupBox = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 16px',
  gap: '24px',
}

const PCPaper = {
  width: 'calc(100%-16px)',
  height: '92px',
  overflow: 'auto',
  borderRadius: '8px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'text.assistive',
  padding: '8px',
  backgroundColor: 'background.secondary',
}

const MobilePaper = {
  width: 'calc(100%-16px)',
  height: '146px',
  overflow: 'auto',
  borderRadius: '8px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'text.assistive',
  padding: '8px',
  backgroundColor: 'background.secondary',
}

const Policy1 =
  '이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다. 이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다. 이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다. 이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다. 이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다. 이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다.이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다.'

const Privacy = () => {
  const { isPc } = useMedia()
  const [checkStatus, setCheckStatus] = useState<boolean[]>([false, false])
  const [signedDate, setSignedDate] = useState<[string, string]>(['', ''])

  const router = useRouter()
  const searchParams = useSearchParams()
  const socialEmail = searchParams.get('social-email')

  useEffect(() => {
    // 로그인 상태일 경우 메인 페이지로 이동
    const isLogin = useAuthStore.getState().isLogin
    if (isLogin) router.replace('/')
  }, [])

  const onClick = () => {
    if (checkStatus[0] && checkStatus[1])
      router.push(`/signup?service-agreement=${
        signedDate[0]
      }&privacy-agreement=${signedDate[1]}
        ${socialEmail && '&social-email=' + socialEmail}`)
  }

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckStatus([event.target.checked, event.target.checked])
    if (event.target.checked) {
      setSignedDate([new Date().toISOString(), new Date().toISOString()])
    }
  }

  const handleCheckServiceUse = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCheckStatus((prev) => [event.target.checked, prev[1]])
    if (event.target.checked)
      setSignedDate((prev) => [new Date().toISOString(), prev[1]])
  }

  const handlePrivacy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckStatus((prev) => [prev[0], event.target.checked])
    if (event.target.checked)
      setSignedDate((prev) => [prev[0], new Date().toISOString()])
  }

  return (
    <>
      <BoxBase pcSx={PCSignupBox} mobileSx={MobileSignupBox}>
        <Typography variant="Title3Emphasis">회원가입</Typography>
        <Stack gap={'16px'}>
          <Stack>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkStatus[0] && checkStatus[1]}
                  indeterminate={checkStatus[0] !== checkStatus[1]}
                  onChange={handleCheckAll}
                />
              }
              label={
                <Typography variant="CaptionEmphasis">전체동의</Typography>
              }
            />
            <Typography variant="Caption">
              실명 인증된 아이디로 가입,이벤트 혜택 정보 수신(선택) 동의를
              포함합니다.
            </Typography>
          </Stack>
          <Stack>
            <FormControlLabel
              control={<Checkbox onChange={handleCheckServiceUse} />}
              label={
                <Typography
                  variant="CaptionEmphasis"
                  color={'text.alternative'}
                >
                  [필수] peer 이용 약관
                </Typography>
              }
              checked={checkStatus[0]}
            />
            <Paper sx={isPc ? PCPaper : MobilePaper}>
              <Typography variant="Caption" color={'text.alternative'}>
                {Policy1}
              </Typography>
            </Paper>
          </Stack>
          <Stack>
            <FormControlLabel
              control={<Checkbox onChange={handlePrivacy} />}
              label={
                <Typography
                  variant="CaptionEmphasis"
                  color={'text.alternative'}
                >
                  [필수] 개인정보 수집 및 이용
                </Typography>
              }
              checked={checkStatus[1]}
            />
            <Paper sx={isPc ? PCPaper : MobilePaper}>
              <PrivacyPolicy />
            </Paper>
          </Stack>
        </Stack>
        <CuButton
          message={'다음'}
          action={onClick}
          variant={'contained'}
          disabled={!checkStatus[0] || !checkStatus[1]}
          fullWidth
        />
      </BoxBase>
    </>
  )
}

export default Privacy
