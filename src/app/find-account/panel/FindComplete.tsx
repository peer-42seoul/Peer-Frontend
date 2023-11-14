'use client'

import React from 'react'
import { Typography, IconButton, Box, Button } from '@mui/material'
import useMedia from '@/hook/useMedia'
import { NavigateBefore } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

const FindComplete = () => {
  const { isPc } = useMedia()
  const router = useRouter()
  return (
    <>
      {isPc ? (
        <Typography>임시 비밀번호 발급 완료</Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <IconButton
            sx={{ width: '40px', height: '40px' }}
            onClick={() => router.back()}
          >
            <NavigateBefore />
          </IconButton>
          <Typography>임시 비밀번호 발급 완료</Typography>
          <IconButton sx={{ width: '40px', height: '40px' }} disabled />
        </Box>
      )}
      <Typography sx={{ fontSize: '14px' }}>
        메일로 임시 비밀번호를 전송해드렸습니다. 로그인 하신 후, 반드시
        비밀번호를 수정해 주세요. 비밀번호는 마이페이지 {`>`} 개인정보에서
        수정할 수 있습니다.
      </Typography>
      <Button href={'/login'} fullWidth>
        로그인
      </Button>
    </>
  )
}

export default FindComplete
