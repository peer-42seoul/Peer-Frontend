'use client'

import { Box, Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import useSWR from 'swr'
import MessageNavigator from './MessageNavigator'
import useMessageStore from '@/states/useMessageStore'

interface IUserInformation {
  nickname: string
  content: string
  profileImage: string
  messageTime: [2023, 9, 6, 17, 16, 51, 131412000]
  messageType: string
}

const MessageCreator = () => {
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [id, setId] = useState(42)
  const router = useRouter()
  const { setNewChat } = useMessageStore()

  const messageSubmitHandler = useCallback(async () => {
    try {
      const data = {
        id: setId(id + 1),
        nickname,
        content,

        // 얘들 둘은 실제 api구성할 때 삭제하기
        messageTime: [2023, 9, 6, 17, 16, 51, 144650000],
        messageType: 'SEND',
      }
      const response = await axios.post(
        'http://localhost:4000/message_userzero', //이 주소도 임시라서 api구성할 때 삭제하기
        data,
      )
      console.log(response)
      setNewChat(false)
    } catch (error) {
      console.error(error)
    }
  }, [nickname, content, router])

  return (
    <Container>
      <Box>
        <Box>
          <Typography>받는 사람</Typography>
          <Button>팀 리스트</Button>
        </Box>
        <TextField
          value={nickname}
          label="받는 사람"
          variant="outlined"
          onChange={(e) => setNickname(e.target.value)}
        />
      </Box>
      <TextField
        value={content}
        label="내용"
        variant="outlined"
        multiline
        rows={3}
        onChange={(e) => setContent(e.target.value)}
      />
      <Box>
        <Button
          onClick={() => {
            router.push('http://localhost:3000/profile/message')
          }}
        >
          취소
        </Button>
        <Button onClick={messageSubmitHandler}>보내기</Button>
      </Box>
    </Container>
  )
}

const MessageItem = ({ user }: { user: IUserInformation }) => {
  return (
    <>
      <Box sx={{ width: 328, height: 100, padding: '16px 0 16px 0' }}>
        <Typography>{user.nickname}</Typography>
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
  const { data, error } = useSWR('http://localhost:4000/message_list', fetcher)
  const { newChat } = useMessageStore()

  const messageContentHandler = useCallback(() => {
    router.push(`http://localhost:3000/profile/message/${userId}`)
  }, [])
  if (error) return <Box>데이터 불러오기를 실패하였습니다.</Box>
  if (!data) return <Box>데이터를 불러오는 중입니다...</Box>

  return (
    <Container>
      {newChat ? (
        <>
          <MessageNavigator title={'새 쪽지'} messageType={'create'} />
          <MessageCreator />
        </>
      ) : (
        <>
          <MessageNavigator title={'쪽지'} messageType={'쪽지'} />
          <Box>
            {data.map((user: IUserInformation, idx: number) => (
              <Box key={idx} onClick={messageContentHandler}>
                <MessageItem user={user} />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Container>
  )
}

export default MessageList
