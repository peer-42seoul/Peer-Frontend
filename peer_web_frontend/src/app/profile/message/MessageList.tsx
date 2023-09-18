'use client'

import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import MessageNavigator from '../../../components/MessageNavigator'
import CircularProgress from '@mui/material/CircularProgress'

interface IUserInformation {
  nickname: string
  profileImage: string
  messageTime: string
  lastContent: string
}

type MessageListProps = {
  data: IUserInformation[] | []
  error: Error | undefined
  isLoading: boolean
  spinner: boolean
}
const MessageItem = ({ user }: { user: IUserInformation }) => {
  return (
    <>
      <Typography>{user.nickname}</Typography>
      <Typography>{user.messageTime}</Typography>
      <Typography>{user.lastContent}</Typography>

      <Box
        component="img"
        src={`${user.profileImage}`}
        alt="picture_of_sender"
        width={100}
        height={100}
      />
    </>
  )
}

const MessageList = ({ data, error, isLoading, spinner }: MessageListProps) => {
  const userId = 'userzero' // 예시로 문자열 "123" 사용
  const router = useRouter()
  // const [isLoading, setIsLoading] = useState(false)
  const messageContentHandler = useCallback(() => {
    router.push(`http://localhost:3000/profile/message/${userId}`)
  }, [router])

  if (error) return <Box>데이터 불러오기를 실패하였습니다.</Box>
  if (!data) return <Box>쪽지함이 비었습니다.</Box>
  if (isLoading) return <Box>데이터를 불러오는 중입니다...</Box>

  return (
    <>
      <MessageNavigator title={'쪽지'} messageType={'쪽지'} />
      <Box>
        {data.map((user: IUserInformation, idx: number) => (
          <Box
            sx={{ padding: '16px 0 16px 0' }}
            key={idx}
            onClick={messageContentHandler}
          >
            <MessageItem user={user} />
          </Box>
        ))}
      </Box>
      {spinner && <CircularProgress />}
    </>
  )
}

export default MessageList
