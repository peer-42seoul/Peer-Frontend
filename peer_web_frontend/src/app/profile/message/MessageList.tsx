'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import MessageNavigator from '../../../components/MessageNavigator'
import CircularProgress from '@mui/material/CircularProgress'
import useMessageStore from '@/states/useMessageStore'
interface IUserInformation {
  nickname: string
  profileImage: string
  messageTime: string
  lastContent: string
}

interface IMessageList {
  data: IUserInformation[] | []
  error: Error | undefined
  isLoading: boolean
  spinner: boolean
  setSelectedStatus: (newValue: boolean) => void
  isPc: boolean
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

const MessageList = ({
  data,
  error,
  isLoading,
  spinner,
  setSelectedStatus,
  isPc,
}: IMessageList) => {
  const router = useRouter()

  const messageContentHandler = useCallback(
    (nickname: string) => {
      if (!isPc) {
        setSelectedStatus(true),
          useMessageStore.setState({ storeNickname: nickname })

        router.push(
          // `http://localhost:3000/profile/message/nickname?search=${nickname}`,
          'http://localhost:3000/profile/message/' + nickname,
        )
      } else {
        setSelectedStatus(true)
        useMessageStore.setState({ storeNickname: nickname })
      }
    },
    [router, isPc],
  )

  if (error) return <Box>데이터 불러오기를 실패하였습니다.</Box>
  if (!data) return <Box>쪽지함이 비었습니다.</Box>
  if (isLoading) return <Box>데이터를 불러오는 중입니다...</Box>

  return (
    <Stack>
      {!isPc && <MessageNavigator title={'쪽지'} messageType={'쪽지'} />}
      <Box>
        {data.map((user: IUserInformation, idx: number) => (
          <Box
            sx={{ padding: '16px 0 16px 0' }}
            key={idx}
            onClick={() => messageContentHandler(data[idx].nickname)}
          >
            <MessageItem user={user} />
          </Box>
        ))}
      </Box>
      {spinner && <CircularProgress />}
    </Stack>
  )
}

export default MessageList
