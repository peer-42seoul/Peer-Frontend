'use client'

import useMedia from '@/hook/useMedia'
import { Button, ButtonGroup, Stack, Typography, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const StyledButtonGroup = styled(ButtonGroup)({
  '& .MuiButtonGroup-grouped:not(:last-of-type)': {
    borderColor: 'transparent',
  },
})

const Sidebar = () => {
  const router = useRouter()
  const { isPc } = useMedia()

  return (
    <Stack alignItems={!isPc ? 'center' : ''}>
      <Typography variant="Title1Emphasis">About Us</Typography>
      <StyledButtonGroup variant="text" orientation="vertical" fullWidth>
        <Button onClick={() => router.push('/about')}>
          Peer는 어떤 커뮤니티인가
        </Button>
        <Button onClick={() => router.push('/about/mind')}>
          Peer 철학 & 비전
        </Button>
        <Button onClick={() => router.push('/about/announce')}>공지사항</Button>
        <Button onClick={() => router.push('/about/dictionary')}>
          Peer 개발백서
        </Button>
        <Button onClick={() => router.push('/about/contact')}>
          Contact us
        </Button>
        <Button onClick={() => router.push('/about/personal')}>
          개인정보 보호 방침
        </Button>
        <Button onClick={() => router.push('/about/service')}>
          통합 서비스 이용약관
        </Button>
      </StyledButtonGroup>
    </Stack>
  )
}

const AboutPage = ({ children }: { children: ReactNode }) => {
  const { isPc, isTablet } = useMedia()

  if (isPc) {
    return (
      <Stack mx={isTablet ? '4rem' : '8rem'} my={'1rem'}>
        <Stack display={'flex'} direction={'row'}>
          <Stack flex={1}>
            <Sidebar />
          </Stack>
          <Stack flex={3}>{children}</Stack>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack spacing={'2rem'}>
      <Stack>{children}</Stack>
      <Sidebar />
    </Stack>
  )
}

export default AboutPage
