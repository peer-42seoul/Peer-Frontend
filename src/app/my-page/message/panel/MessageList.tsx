'use client'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import {
  Avatar,
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { IMessageListData } from '@/types/IMessage'

interface IMessageItemProps {
  message: IMessageListData
  isManageMode: boolean
  isChecked: boolean
  toggleSelectUser: (targetId: number) => void
}

const PCMessageItem = ({
  message,
  isManageMode,
  isChecked,
  toggleSelectUser,
}: IMessageItemProps) => {
  const router = useRouter()
  const label = { inputProps: { 'aria-label': 'MessageItem Checkbox' } }
  const { targetId, conversationId } = message
  return (
    <ListItem>
      <ListItemButton
        role={undefined}
        onClick={
          isManageMode
            ? () => toggleSelectUser(targetId)
            : () =>
                router.push(
                  `/my-page/message/${conversationId}?target=${targetId}`,
                )
        }
      >
        {isManageMode && (
          <ListItemIcon>
            <Checkbox {...label} checked={isChecked} />
          </ListItemIcon>
        )}
        <MessageItemBase message={message} />
      </ListItemButton>
    </ListItem>
  )
}

const MessageItemBase = ({ message }: { message: IMessageListData }) => {
  const { targetNickname, latestContent, targetProfile, unreadMsgNumber } =
    message
  return (
    <>
      <ListItemAvatar>
        <Avatar src={targetProfile} />
      </ListItemAvatar>
      <ListItemText primary={targetNickname} secondary={latestContent} />
      <ListItemSecondaryAction>
        <Stack alignItems={'flex-end'}>
          <Typography>
            {/* TODO : latestDate 데이터로 바꿀 것!!!!!!! */}
            {dayjs('2021-08-01T16:26:39.098').format('MM월 DD일')}
          </Typography>
          <Chip
            label={
              unreadMsgNumber > 0
                ? unreadMsgNumber > 99
                  ? '99+'
                  : unreadMsgNumber
                : null
            }
          />
        </Stack>
      </ListItemSecondaryAction>
    </>
  )
}

interface IMessageListProps {
  messageList: IMessageListData[]
  state: {
    isManageMode: boolean
    isLoading: boolean
    error: any
  }
  selectedUsers: Set<number>
  toggleSelectUser: (targetId: number) => void
}

const MessageList = ({
  messageList,
  state,
  selectedUsers,
  toggleSelectUser,
}: IMessageListProps) => {
  const { isManageMode, isLoading, error } = state

  if (isLoading) return <Typography>데이터를 불러오는 중입니다 @_@</Typography>
  if (error) return <Typography>데이터 불러오기에 실패했습니다.</Typography>
  if (messageList.length === 0)
    return <Typography>쪽지함이 비었습니다.</Typography>

  return (
    <List>
      {messageList.map((message) => (
        <PCMessageItem
          key={message.targetId}
          message={message}
          isManageMode={isManageMode}
          isChecked={selectedUsers.has(message.targetId)}
          toggleSelectUser={toggleSelectUser}
        />
      ))}
    </List>
  )
}

export default MessageList
