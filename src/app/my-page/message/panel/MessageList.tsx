'use client'

import { useRouter } from 'next/navigation'
import { Avatar, Checkbox, Grid, Stack, Typography } from '@mui/material'
import { IMessagObject } from '@/types/IMessageInformation'

interface IMessageItemProps {
  message: IMessagObject
  isManageMode: boolean
  userSelector: (newValue: Array<{ targetId: number }>) => void
}

const MessageItem = ({ message, isManageMode }: IMessageItemProps) => {
  const router = useRouter()
  const label = { inputProps: { 'aria-label': 'MessageItem Checkbox' } }
  const {
    targetId,
    // conversationalId,
    targetNickname,
    latestDate,
    latestContent,
    targetProfile,
    unreadMsgNumber,
  } = message

  //   const handleMessageClick = () => {
  //     // TODO : 전역 상태로 관리할 필요가 있는지 확인해보기 (필요없어보임;)
  //     useMessageStore.setState({
  //       storedTargetId: targetId,
  //       setStoredConversationalId: conversationalId,
  //     })
  //   }

  return (
    <Stack direction={'row'}>
      {isManageMode && <Checkbox {...label} />}
      <Grid
        container
        onClick={() => router.push(`/my-page/message/${targetId}`)}
        sx={{ cursor: 'pointer' }}
        spacing={2}
        alignItems="center"
      >
        <Grid item xs={2}>
          <Avatar src={targetProfile} />
        </Grid>
        <Grid item xs>
          <Stack alignItems={'flex-start'}>
            <Typography>{targetNickname}</Typography>
            <Typography noWrap={true}>{latestContent}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Stack alignItems={'flex-end'}>
            <Typography>{latestDate}</Typography>
            <Typography
              style={{
                width: '24px',
                color: 'white',
                background: 'rgba(255, 81, 64, 1)',
                borderRadius: '50%',
                textAlign: 'center',
              }}
            >
              {unreadMsgNumber > 0 ? unreadMsgNumber : null}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

interface IMessageListProps {
  messages: IMessagObject[]
  isManageMode: boolean
  setSelectedUser: (newValue: Array<{ targetId: number }>) => void
}

const MessageList = ({
  messages,
  isManageMode,
  setSelectedUser,
}: IMessageListProps) => {
  return (
    <Stack spacing={2}>
      {messages.map((message) => (
        <MessageItem
          key={message.targetId}
          message={message}
          isManageMode={isManageMode}
          userSelector={setSelectedUser}
        />
      ))}
    </Stack>
  )
}

export default MessageList
