import { useRouter } from 'next/router'
import { Checkbox, ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import { IMessageListData } from '@/types/IMessage'
import MessageItemBase from './MessageItemBase'

interface IMessageItemProps {
  message: IMessageListData
  isManageMode: boolean
  isChecked: boolean
  toggleSelectUser: (targetId: number) => void
}

export const PCMessageItem = ({
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
