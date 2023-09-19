'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import MessageNavigator from '@/components/MessageNavigator'
import useMessageStore from '@/states/useMessageStore'
import { Box, Button, Container, Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
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
          <Box
            component={'img'}
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

const MessageChatPage = ({ selectedStatus }: { selectedStatus: boolean }) => {
  const userId = 'userzero' // 예시로 문자열 "123" 사용
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const { storeNickname } = useMessageStore()

  console.log('selectedStatus', selectedStatus)
  console.log('search', search)
  console.log('storeNickname?', storeNickname)

  const { data, error, isLoading } = useSWR(
    selectedStatus
      ? // ? 'http://localhost:4000/message/nickname?search=' + storeNickname 오리지널
        'http://localhost:4000/message_' + storeNickname
      : null,
    defaultGetFetcher,
  )
  if (error) return <Box>쪽지 불러오기를 실패하였습니다.</Box>
  if (!data) return <Box>빈 쪽지함 입니다.</Box>
  if (isLoading) return <Box>쪽지를 불러오는 중입니다...</Box>

  return (
    <Container>
      <MessageNavigator title={storeNickname} messageType={'inchatting'} />
      <Box sx={{ width: '100%' }}>
        {data.map((user: IMessageInformation, idx: number) => {
          return <MessageContent key={idx} user={user} />
        })}
        <Button
          onClick={() => {
            router.push(
              `http://localhost:3000/profile/message/view?target=${userId}`,
            )
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

export default MessageChatPage
