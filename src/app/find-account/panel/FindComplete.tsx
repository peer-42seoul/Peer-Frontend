'use client'

import React from 'react'
import { Typography, Button } from '@mui/material'

const FindComplete = () => {
  return (
    <>
      <Typography>임시 비밀번호 발급 완료</Typography>
      <Typography sx={{ fontSize: '14px' }}>
        메일로 임시 비밀번호를 전송해드렸습니다. 로그인 하신 후, 반드시
        비밀번호를 수정해 주세요. 비밀번호는 마이페이지 {`>`} 개인정보에서
        수정할 수 있습니다.
      </Typography>
      <Button href={'/login'} variant="contained" fullWidth>
        로그인
      </Button>
    </>
  )
}

export default FindComplete
