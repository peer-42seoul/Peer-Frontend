import { Checkbox, ListItem, ListItemButton, Stack } from '@mui/material'
import useMessagePageState from '@/states/useMessagePageState'
import { IMessageListData } from '@/types/IMessage'
import MessageItemBase from './MessageItemBase'
import * as style from './PCMessageListItem.style'

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
    <ListItem disablePadding sx={style.listItem}>
      <ListItemButton
        disableGutters
        onClick={
          isManageMode
            ? () => toggleSelectUser(targetId)
            : () => setDetailPage(conversationId, targetId)
        }
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          spacing={'0.5rem'}
          width={'100%'}
        >
          {isManageMode && (
            <Checkbox {...label} sx={style.checkbox} checked={isChecked} />
          )}
          <MessageItemBase message={message} />
        </Stack>
      </ListItemButton>
    </ListItem>
  )
}
