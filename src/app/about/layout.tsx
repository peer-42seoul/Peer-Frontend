'use client'

import useMedia from '@/hook/useMedia'
import useAboutLayout from '@/states/useAboutLayout'
import { Button, ButtonGroup, Stack, Typography, styled } from '@mui/material'
import { ReactNode } from 'react'

const StyledButtonGroup = styled(ButtonGroup)({
  '& .MuiButtonGroup-grouped:not(:last-of-type)': {
    borderColor: 'transparent',
  },
})

const Sidebar = () => {
  const { isPc } = useMedia()
  const { setBoard } = useAboutLayout()

  return (
    <Stack alignItems={!isPc ? 'center' : ''}>
      <Typography variant="Title1Emphasis">About Us</Typography>
      <StyledButtonGroup variant="text" orientation="vertical" fullWidth>
        <Button onClick={() => setBoard('PEER')}>
          Peer는 어떤 커뮤니티인가
        </Button>
        <Button onClick={() => setBoard('MIND')}>Peer 철학 & 비전</Button>
        <Button onClick={() => setBoard('ANNOUNCE')}>공지사항</Button>
        <Button onClick={() => setBoard('DICTIONARY')}>Peer 개발백서</Button>
        <Button onClick={() => setBoard('CONTACT')}>Contact us</Button>
        <Button onClick={() => setBoard('PERSONAL')}>개인정보 보호 방침</Button>
        <Button onClick={() => setBoard('SERVICE')}>
          통합 서비스 이용약관
        </Button>
      </StyledButtonGroup>
    </Stack>
  )
}

interface AboutPageProps {
  contact: ReactNode
  personal: ReactNode
  announce: ReactNode
  mind: ReactNode
  dictionary: ReactNode
  service: ReactNode
  peer: ReactNode
  detail: ReactNode
}

const AboutPage = (props: AboutPageProps) => {
  const { boardType } = useAboutLayout()
  const { isPc } = useMedia()

  if (isPc) {
    return (
      <Stack mx={'12rem'} my={'1rem'}>
        <Stack display={'flex'} direction={'row'}>
          <Stack flex={1}>
            <Sidebar />
          </Stack>
          <Stack flex={3}>
            {boardType === 'PEER' && props.peer}
            {boardType === 'MIND' && props.mind}
            {boardType === 'ANNOUNCE' && props.announce}
            {boardType === 'DICTIONARY' && props.dictionary}
            {boardType === 'CONTACT' && props.contact}
            {boardType === 'PERSONAL' && props.personal}
            {boardType === 'SERVICE' && props.service}
            {boardType === 'ANNOUNCE_DETAIL' && props.detail}
          </Stack>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack spacing={'2rem'}>
      <Stack>
        {boardType === 'PEER' && props.peer}
        {boardType === 'MIND' && props.mind}
        {boardType === 'ANNOUNCE' && props.announce}
        {boardType === 'DICTIONARY' && props.dictionary}
        {boardType === 'CONTACT' && props.contact}
        {boardType === 'PERSONAL' && props.personal}
        {boardType === 'SERVICE' && props.service}
        {boardType === 'ANNOUNCE_DETAIL' && props.detail}
      </Stack>
      <Sidebar />
    </Stack>
  )
}

export default AboutPage
