'use client'

import { useRouter } from 'next/navigation'
import { Avatar, Checkbox, Grid, Stack, Typography } from '@mui/material'
import { IMessagObject } from '@/types/IMessageInformation'

interface IMessageItemProps {
  message: IMessagObject
  isManageMode: boolean
  toggleSelectUser: (targetId: number) => void
}

const MessageItem = ({
  message,
  isManageMode,
  toggleSelectUser,
}: IMessageItemProps) => {
  const router = useRouter()
  const label = { inputProps: { 'aria-label': 'MessageItem Checkbox' } }
  const {
    targetId,
    conversationalId,
    targetNickname,
    latestDate,
    latestContent,
    targetProfile,
    unreadMsgNumber,
  } = message

  return (
    <Stack direction={'row'} spacing={1}>
      {isManageMode && (
        <Checkbox {...label} onChange={() => toggleSelectUser(targetId)} />
      )}
      <Grid
        container
        onClick={() =>
          router.push(`/my-page/message/${conversationalId}?target=${targetId}`)
        }
        sx={{ cursor: 'pointer' }}
        spacing={1}
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
  toggleSelectUser: (targetId: number) => void
}

const MessageList = ({
  messages,
  isManageMode,
  toggleSelectUser,
}: IMessageListProps) => {
  return (
    <Stack spacing={2}>
      {messages.map((message) => (
        <MessageItem
          key={message.targetId}
          message={message}
          isManageMode={isManageMode}
          toggleSelectUser={toggleSelectUser}
        />
      ))}
    </Stack>
  )
}

export default MessageList
