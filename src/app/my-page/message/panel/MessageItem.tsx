import { useRouter } from 'next/navigation'
import { Checkbox, ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import { IMessageListData } from '@/types/IMessage'
import MessageItemBase from './MessageItemBase'
import CuButton from '@/components/CuButton'
import SwappableComponent from './SwappableComponent'
import { AxiosResponse } from 'axios'
import useAxiosWithAuth from '@/api/config'

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

interface IMobileMessageListItemProps {
  message: IMessageListData
}

export const MobileMessageListItem = ({
  message,
}: IMobileMessageListItemProps) => {
  const router = useRouter()
  const { targetId, conversationId } = message
  const axiosWithAuth = useAxiosWithAuth()

  const deleteOneMessage = () => {
    alert('삭제')
    // axiosWithAuth
    //   .delete('/api/v1/message/delete-message', {
    //     data: {
    //       target: targetId,
    //     },
    //   })
    //   .catch(() => {
    //     // 보완 예정
    //     alert('쪽지 삭제에 실패했습니다.')
    //   })
  }

  return (
    <ListItem sx={mobileItemWrapperStyle}>
      <SwappableComponent
        gap={{ x: -30, y: 0 }}
        offset={{ x: '-13%', y: '0' }}
        eventHandler={deleteOneMessage}
      >
        <ListItemButton
          onClick={() =>
            router.push(`/my-page/message/${conversationId}?target=${targetId}`)
          }
          sx={{ flex: '1 0 100%' }}
        >
          <MessageItemBase message={message} />
        </ListItemButton>
      </SwappableComponent>
      <CuButton
        variant="contained"
        style={mobileItemDeleteButtonStyle}
        message="삭제"
      />
    </ListItem>
  )
}
