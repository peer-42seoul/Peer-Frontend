'use client'
import { List, Typography } from '@mui/material'
import { IMessageListData } from '@/types/IMessage'
import { PCMessageItem } from './MessageItem'

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
