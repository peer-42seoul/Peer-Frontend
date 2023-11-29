import { useRouter } from 'next/navigation'
import { Checkbox, ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import { IMessageListData } from '@/types/IMessage'
import MessageItemBase from './MessageItemBase'
import CuButton from '@/components/CuButton'

interface IPCMessageItemProps {
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
}: IPCMessageItemProps) => {
  const router = useRouter()
  const label = { inputProps: { 'aria-label': 'MessageItem Checkbox' } }
  const { targetId, conversationId } = message
  return (
    <ListItem>
      <ListItemButton
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

const mobileItemWrapperStyle = {
  display: 'flex',
  transition: 'transform 800ms',
}

const mobileItemDeleteButtonStyle = {
  minWidth: '55px',
  marginTop: '1rem',
}

interface IMobileMessageItemProps {
  message: IMessageListData
}

export const MobileMessageItem = ({ message }: IMobileMessageItemProps) => {
  const router = useRouter()
  const { targetId, conversationId } = message

  return (
    <ListItem sx={mobileItemWrapperStyle}>
      <ListItemButton
        onClick={() =>
          router.push(`/my-page/message/${conversationId}?target=${targetId}`)
        }
        sx={{ flex: '1 0 100%' }}
      >
        <MessageItemBase message={message} />
      </ListItemButton>
      <CuButton
        variant="contained"
        style={mobileItemDeleteButtonStyle}
        message="삭제"
      />
    </ListItem>
  )
}
