'use client'
import { List, Typography } from '@mui/material'
import { IMessageListData } from '@/types/IMessage'
import useMedia from '@/hook/useMedia'
import { PCMessageListItem } from './PCMessageItem'
import MobileMessageListItem from './MobileMessageItem'

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

const mobileListStyle = {
  overflowX: 'hidden',
}

const MessageList = ({
  messageList,
  state,
  selectedUsers,
  toggleSelectUser,
}: IMessageListProps) => {
  const { isManageMode, isLoading, error } = state
  const { isPc } = useMedia()

  if (isLoading) return <Typography>데이터를 불러오는 중입니다 @_@</Typography>
  if (error) return <Typography>데이터 불러오기에 실패했습니다.</Typography>
  if (messageList.length === 0)
    return <Typography>쪽지함이 비었습니다.</Typography>

  if (isPc)
    return (
      <List>
        {messageList.map((message) => (
          <PCMessageListItem
            key={message.targetId}
            message={message}
            isManageMode={isManageMode}
            isChecked={selectedUsers.has(message.targetId)}
            toggleSelectUser={toggleSelectUser}
          />
        ))}
      </List>
    )
  return (
    <List sx={mobileListStyle}>
      {messageList.map((message) => (
        <MobileMessageListItem key={message.targetId} message={message} />
      ))}
    </List>
  )
}

export default MessageList
