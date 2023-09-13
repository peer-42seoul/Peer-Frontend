'use client'

import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import useSWR from 'swr'
import MessageNavigator from './MessageNavigator'

interface IUserInformation {
  nickname: string
  content: string
  profileImage: string
  messageTime: [2023, 9, 6, 17, 16, 51, 131412000]
  messageType: string
}

const MessageItem = ({ user }: { user: IUserInformation }) => {
  return (
    <>
      <Typography>{user.nickname}</Typography>
      <Box>
        <img
          src="https://source.unsplash.com/random/100×100"
          alt="picture_of_sender"
          width={100}
          height={100}
        />
      </Box>
    </>
  )
}

const MessageList = () => {
  const userId = 'userzero' // 예시로 문자열 "123" 사용
  const router = useRouter()
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { data, error, isLoading } = useSWR(
    'http://localhost:4000/message_list',
    fetcher,
  )

  const messageContentHandler = useCallback(() => {
    router.push(`http://localhost:3000/profile/message/${userId}`)
  }, [])

  if (error) return <Box>데이터 불러오기를 실패하였습니다.</Box>
  if (!data) return <Box>쪽지함이 비었습니다.</Box>
  if (isLoading) return <Box>데이터를 불러오는 중입니다...</Box>

  return (
    <Container>
      <>
        <MessageNavigator title={'쪽지'} messageType={'쪽지'} />
        <Box>
          {data.map((user: IUserInformation, idx: number) => (
            <Box
              sx={{ width: 328, height: 100, padding: '16px 0 16px 0' }}
              key={idx}
              onClick={messageContentHandler}
            >
              <MessageItem user={user} />
            </Box>
          ))}
        </Box>
      </>
    </Container>
  )
}

export default MessageList
