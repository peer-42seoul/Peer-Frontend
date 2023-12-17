import { TouchEvent, useState, ReactNode, useRef } from 'react'
import { ListItem, ListItemButton, Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import useMessagePageState from '@/states/useMessagePageState'
import { IMessageListData } from '@/types/IMessage'
import MessageItemBase from './MessageItemBase'
import * as style from './MobileMessageItem.style'

/* ANCHOR - interface */
interface ITouchState {
  // wrapperHeight: string | number // 삭제 animation을 위한 wrapper 높이
  diffLength: string // 컴포넌트가 밀릴 길이
  startX: number // drag 시작 x좌표
  side: 'LEFT' | 'RIGHT' | null
}
interface ISwappableMessageItemProps {
  children: ReactNode
  eventHandler: () => void
}
interface IMobileMessageListItemProps {
  message: IMessageListData
}

/* ANCHOR - constants */
const TOUCH_OFFSET = 20 // 터치 이벤트를 발생시킬 최소 길이
const DELETE_BUTTON_WIDTH = '10.8%'

/* ANCHOR - components */
const SwappableMessageItem = ({
  children,
  eventHandler,
}: ISwappableMessageItemProps) => {
  const [touchState, setTouchState] = useState<ITouchState>({
    diffLength: '0',
    startX: 0,
    side: null,
  })
  const handleTouchStart = (event: TouchEvent) => {
    event.stopPropagation()
    setTouchState((prevState) => ({
      ...prevState,
      startX: event.touches[0].clientX,
    }))
  }
  const handleTouchMove = (event: TouchEvent) => {
    event.stopPropagation()
    const dragLength = event.touches[0].clientX - touchState.startX
    if (dragLength < 0 && Math.abs(dragLength) >= TOUCH_OFFSET) {
      // 왼쪽으로 드래그하는 경우
      setTouchState((prevState) => ({
        ...prevState,
        diffLength: `-${DELETE_BUTTON_WIDTH}`,
        side: 'LEFT',
      }))
    } else if (dragLength > 0 && Math.abs(dragLength) >= TOUCH_OFFSET) {
      // 오른쪽으로 드래그하는 경우
      setTouchState((prevState) => ({
        ...prevState,
        diffLength: '0',
        side: 'RIGHT',
      }))
    } else {
      // 그 외의 경우
      setTouchState((prevState) => ({
        ...prevState,
        diffLength: '0',
        side: null,
      }))
    }
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      sx={{
        ...style.swappableWrapper,
        transform: `translateX(${touchState.diffLength})`,
      }}
    >
      {children}
      <CuButton
        message="삭제"
        style={{
          ...style.removeButton,
          opacity: `${touchState.side === 'LEFT' ? 1 : 0}`,
        }}
        action={eventHandler}
        variant="contained"
      />
    </Stack>
  )
}

const MobileMessageListItem = ({ message }: IMobileMessageListItemProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { setDetailPage } = useMessagePageState()
  const { targetId, conversationId } = message
  const listItemRef = useRef(null)
  const deleteOneMessage = () => {
    axiosWithAuth
      .delete('/api/v1/message/delete-message', {
        data: { target: [{ targetId }] },
      })
      .catch(() => {
        // 보완 예정
        alert('쪽지 삭제에 실패했습니다.')
      })
  }

  return (
    <ListItem>
      <SwappableMessageItem eventHandler={deleteOneMessage}>
        <ListItemButton
          ref={listItemRef}
          onClick={() => setDetailPage(conversationId, targetId)}
          sx={{ flex: '1 0 100%' }}
        >
          <MessageItemBase message={message} />
        </ListItemButton>
      </SwappableMessageItem>
    </ListItem>
  )
}

export default MobileMessageListItem
