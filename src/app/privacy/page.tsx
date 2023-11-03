'use client'

import CuButton from '@/components/CuButton'
import { Checkbox, FormControlLabel, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Privacy = () => {
  const [checkAll, setCheckAll] = useState<boolean>(false)
  const [checkStatus, setCheckStatus] = useState<boolean[]>([false, false])
  const [disabled, setDisabled] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    console.log(checkStatus)
  }, [checkStatus])

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
      <Typography variant="h4">개인정보처리방침</Typography>
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
        실명 인증된 아이디로 가입,이벤트 혜택 정보 수신(선택) 동의를 포함합니다.
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        onChange={() => {
          setCheckStatus([!checkStatus[0], checkStatus[1]])
        }}
        label="[필수] peer 이용 약관"
        checked={checkStatus[0]}
      />
      <Paper sx={{ width: '450px', height: '100px' }}>
        이부분은 테스트 약관입니다.
      </Paper>
      <FormControlLabel
        control={<Checkbox />}
        label="[필수] 개인정보 수집 및 이용"
        onChange={() => {
          setCheckStatus([checkStatus[0], !checkStatus[1]])
        }}
        checked={checkStatus[1]}
      />
      <Paper sx={{ width: '450px', height: '100px' }}>
        이부분은 테스트 약관입니다.
      </Paper>
      <CuButton
        message={'다음'}
        action={onClick}
        variant={'contained'}
        disabled={disabled}
      />
    </>
  )
}

export default Privacy
