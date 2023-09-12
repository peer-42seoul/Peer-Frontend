'use client'

import MessageNavigator from '@/components/MessageNavigator'
import useMessageStore from '@/states/useMessageStore'
import { Box, Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

interface IMessageInformation {
  nickname: string
  content: string
  profileImage: string
  messageTime: [2023, 9, 6, 17, 16, 51, 131412000]
  messageType: string
}
const MessageContent = ({ user }: { user: IMessageInformation }) => {
  return (
    <>
      {user.messageType === 'RECEIVE' && (
        <Box
          sx={{
            width: '100%',
            height: 100,
            padding: '16px 0 16px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: '#D8D8D8',
          }}
        >
          <img
            src="https://source.unsplash.com/random/100×100"
            alt="picture_of_sender"
            width={100}
            height={100}
          />
          <Typography>{user.nickname}</Typography>
          <Typography>{user.content}</Typography>
        </Box>
      )}
      {user.messageType === 'SEND' && (
        <Box
          sx={{
            width: '100%',
            height: 100,
            padding: '16px 0 16px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            backgroundColor: 'lightblue',
          }}
        >
          <Typography>{user.nickname}</Typography>
          <Typography>{user.content}</Typography>
        </Box>
      )}
    </>
  )
}

const Page = () => {
  // const userId = 'userzero' // 예시로 문자열 "123" 사용
  const router = useRouter()
  const { setNewChat } = useMessageStore()

  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR(
    `http://localhost:4000/message_userzero`,
    fetcher,
  )
  if (error) return <Box>쪽지 불러오기를 실패하였습니다.</Box>
  if (!data) return <Box>쪽지를 불러오는 중입니다...</Box>

  return (
    <Container>
      <MessageNavigator title={'유저네임'} messageType={'inchatting'} />
      <Box sx={{ width: '100%' }}>
        {data.map((user: IMessageInformation, idx: number) => {
          return <MessageContent key={idx} user={user} />
        })}
        <Button
          onClick={() => {
            router.push('http://localhost:3000/profile/message/')
            setNewChat(true)
          }}
          sx={{
            width: '100%',
            height: '5vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          답하기
        </Button>
      </Box>
    </Container>
  )
}

export default Page
