'use client'

import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import {
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useAuthStore from '@/states/useAuthStore'

const PCLoginBox = {
  display: 'flex',
  position: 'relative',
  width: '496px',
  padding: '24px 24px 40px 24px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '48px',
  borderRadius: '16px',
  border: '1px solid #000',
}

const MobileLoginBox = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 32px 15px 32px',
}

const PCPaper = {
  width: '450px',
  height: '100px',
  overflow: 'auto',
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
    if (checkStatus[0] && checkStatus[1]) router.push('/signup')
  }

  return (
    <>
      <Container sx={isPc ? PCLoginBox : MobileLoginBox}>
        <Typography variant="h4">개인정보처리방침</Typography>
        <Stack>
          <FormControlLabel
            control={<Checkbox />}
            label="전체 동의하기"
            onChange={() => {
              if (checkAll === false) setCheckStatus([true, true])
              setCheckAll(!checkAll)
            }}
            checked={checkAll}
          />
          <Typography>
            실명 인증된 아이디로 가입,이벤트 혜택 정보 수신(선택) 동의를
            포함합니다.
          </Typography>
        </Stack>
        <Stack>
          <Paper sx={isPc ? PCPaper : MobilePaper}> {Policy1}</Paper>
          <FormControlLabel
            control={<Checkbox />}
            onChange={() => {
              setCheckStatus([!checkStatus[0], checkStatus[1]])
            }}
            label="[필수] peer 이용 약관"
            checked={checkStatus[0]}
          />
        </Stack>
        <Stack>
          <Paper sx={isPc ? PCPaper : MobilePaper}>{Policy1}</Paper>
          <FormControlLabel
            control={<Checkbox />}
            label="[필수] 개인정보 수집 및 이용"
            onChange={() => {
              setCheckStatus([checkStatus[0], !checkStatus[1]])
            }}
            checked={checkStatus[1]}
          />
        </Stack>
        <CuButton
          message={'다음'}
          action={onClick}
          variant={'contained'}
          disabled={disabled}
        />
      </Container>
    </>
  )
}

export default Privacy
