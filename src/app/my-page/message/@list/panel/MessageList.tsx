'use client'
import { List, Typography, CircularProgress, Stack } from '@mui/material'
import { IMessageListData } from '@/types/IMessage'
import useMedia from '@/hook/useMedia'
import { PCMessageListItem } from './PCMessageItem'
import MobileMessageListItem from './MobileMessageItem'
import * as style from './MessageList.style'

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

const SpecialStateComponent = ({
  isLoading,
  isEmpty,
}: {
  isLoading: boolean
  isEmpty: boolean
}) => {
  if (isLoading)
    return (
      <Stack alignItems={'center'}>
        <CircularProgress sx={style.specialStateContent} />
      </Stack>
    )
  if (isEmpty)
    return (
      <Stack alignItems={'center'}>
        <Typography
          variant={'Body2'}
          color={'text.alternative'}
          sx={style.specialStateContent}
        >
          주고받은 쪽지가 없어요.
        </Typography>
      </Stack>
    )
}

const MessageList = ({
  messageList,
  state,
  selectedUsers,
  toggleSelectUser,
}: IMessageListProps) => {
  const { isManageMode, isLoading } = state
  const { isPc } = useMedia()
  const isEmpty = !messageList || messageList.length === 0

  if (isPc)
    return (
      <List disablePadding>
        {isLoading || isEmpty ? (
          <SpecialStateComponent isLoading={isLoading} isEmpty={isEmpty} />
        ) : (
          messageList.map((message) => (
            <PCMessageListItem
              key={message.targetId}
              message={message}
              isManageMode={isManageMode}
              isChecked={selectedUsers.has(message.targetId)}
              toggleSelectUser={toggleSelectUser}
            />
          ))
        )}
      </List>
    )
  return (
    <List sx={style.mobileList}>
      {isLoading || isEmpty ? (
        <SpecialStateComponent isLoading={isLoading} isEmpty={isEmpty} />
      ) : (
        messageList.map((message) => (
          <MobileMessageListItem key={message.targetId} message={message} />
        ))
      )}
    </List>
  )
}

export default MessageList
