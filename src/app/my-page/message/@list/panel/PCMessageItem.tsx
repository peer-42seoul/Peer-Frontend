import { Checkbox, ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import useMessagePageState from '@/states/useMessagePageState'
import { IMessageListData } from '@/types/IMessage'
import MessageItemBase from './MessageItemBase'

interface IPCMessageListItemProps {
  message: IMessageListData
  isManageMode: boolean
  isChecked: boolean
  toggleSelectUser: (targetId: number) => void
}

export const PCMessageListItem = ({
  message,
  isManageMode,
  isChecked,
  toggleSelectUser,
}: IPCMessageListItemProps) => {
  const { setDetailPage } = useMessagePageState()
  const label = { inputProps: { 'aria-label': 'MessageItem Checkbox' } }
  const { targetId, conversationId } = message

  return (
    <ListItem>
      <ListItemButton
        onClick={
          isManageMode
            ? () => toggleSelectUser(targetId)
            : () => setDetailPage(conversationId, targetId)
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
