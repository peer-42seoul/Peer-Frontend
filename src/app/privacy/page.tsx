'use client'

import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import {
  Checkbox,
  Box,
  FormControlLabel,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useAuthStore from '@/states/useAuthStore'
import BoxBase from '@/components/BoxBase'

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
  width: 'calc(100% - 16px)',
  height: '82px',
  overflow: 'auto',
  padding: '8px',
}

const MobilePaper = {
  width: '100%',
  height: '100px',
  overflow: 'auto',
}

const Policy1 =
  '이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다. 이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다. 이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다. 이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다. 이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다. 이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다.이 부분은 테스트 약관입니다. 자세한 내용은 추후에 업데이트 될 예정입니다.'

const Privacy = () => {
  const { isPc } = useMedia()
  const [checkAll, setCheckAll] = useState<boolean>(false)
  const [checkStatus, setCheckStatus] = useState<boolean[]>([false, false])
  const [disabled, setDisabled] = useState<boolean>(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const socialEmail = searchParams.get('social-email')

  // 로그인 상태일 경우 메인 페이지로 이동
  useEffect(() => {
    const isLogin = useAuthStore.getState().isLogin
    if (isLogin) router.replace('/')
  }, [])

  useEffect(() => {
    if (!checkStatus[0] || !checkStatus[1]) {
      setCheckAll(false)
    }
    if (checkStatus[0] && checkStatus[1]) {
      setDisabled(false)
    } else setDisabled(true)
  }, [checkStatus])

  const onClick = () => {
    if (checkStatus[0] && checkStatus[1])
      router.push(
        socialEmail ? '/signup' + '?social-email=' + socialEmail : '/signup',
      )
  }

  return (
    <>
      <BoxBase pcSx={PCSignupBox} mobileSx={MobileSignupBox}>
        <Typography variant="Title3Emphasis">회원가입</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Stack>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography variant="CaptionEmphasis">전체동의</Typography>
              }
              onChange={() => {
                if (checkAll === false) setCheckStatus([true, true])
                else if (checkAll === true && checkStatus[0] && checkStatus[1])
                  setCheckStatus([false, false])
                setCheckAll(!checkAll)
              }}
              checked={checkAll}
            />
            <Typography variant="caption">
              실명 인증된 아이디로 가입,이벤트 혜택 정보 수신(선택) 동의를
              포함합니다.
            </Typography>
          </Stack>
          <Stack>
            <FormControlLabel
              control={<Checkbox />}
              onChange={() => {
                setCheckStatus([!checkStatus[0], checkStatus[1]])
              }}
              label={
                <Typography variant="CaptionEmphasis">
                  [필수] peer 이용 약관
                </Typography>
              }
              checked={checkStatus[0]}
            />
            <Paper sx={isPc ? PCPaper : MobilePaper}>
              <Typography variant="Caption">{Policy1}</Typography>
            </Paper>
          </Stack>
          <Stack>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography variant="CaptionEmphasis">
                  [필수] 개인정보 수집 및 이용
                </Typography>
              }
              onChange={() => {
                setCheckStatus([checkStatus[0], !checkStatus[1]])
              }}
              checked={checkStatus[1]}
            />
            <Paper sx={isPc ? PCPaper : MobilePaper}>
              <Typography variant="Caption">{Policy1}</Typography>
            </Paper>
          </Stack>
        </Box>
        <CuButton
          message={'다음'}
          action={onClick}
          variant={'contained'}
          disabled={disabled}
          fullWidth
        />
      </BoxBase>
    </>
  )
}

export default Privacy
