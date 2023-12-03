import { TouchEvent, useState, ReactNode, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button, ListItem, ListItemButton, Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import { IMessageListData } from '@/types/IMessage'
import MessageItemBase from './MessageItemBase'

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
const initialTouchState: ITouchState = {
  // wrapperHeight: '30rem',
  diffLength: '0',
  startX: 0,
  side: null,
}
const TOUCH_OFFSET = 20 // 터치 이벤트를 발생시킬 최소 길이
const DELETE_BUTTON_WIDTH = '10.8%'
const TRANSITION_DURATION = '800ms'

/* ANCHOR - styles */
const swappableWrapperStyle = {
  width: '100%',
  transition: `transform ${TRANSITION_DURATION}`,
}

const removeButtonStyle = {
  height: '100%',
  transition: `opacity ${TRANSITION_DURATION}`,
  backgroundColor: 'red',
}

/* ANCHOR - components */
const SwappableMessageItem = ({
  children,
  eventHandler,
}: ISwappableMessageItemProps) => {
  const [touchState, setTouchState] = useState<ITouchState>(initialTouchState)
  const handleTouchStart = (event: TouchEvent) => {
    event.stopPropagation()
    const { clientX } = event.touches[0]
    setTouchState((prevState) => ({
      ...prevState,
      startX: clientX,
    }))
  }
  const handleTouchMove = (event: TouchEvent) => {
    event.stopPropagation()
    const { clientX } = event.touches[0]
    const newDiffLength = clientX - touchState.startX
    if (newDiffLength < 0 && newDiffLength <= TOUCH_OFFSET * -1) {
      // 왼쪽으로 드래그하는 경우
      setTouchState((prevState) => ({
        ...prevState,
        diffLength: `-${DELETE_BUTTON_WIDTH}`,
        side: 'LEFT',
      }))
    } else if (newDiffLength > 0 && newDiffLength >= TOUCH_OFFSET) {
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
      spacing={0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      sx={{
        ...swappableWrapperStyle,
        transform: `translateX(${touchState.diffLength})`,
      }}
    >
      {children}
      <Button
        onClick={eventHandler}
        sx={{
          ...removeButtonStyle,
          opacity: `${touchState.side === 'LEFT' ? 1 : 0}`,
        }}
      >
        삭제
      </Button>
    </Stack>
  )
}

const MobileMessageListItem = ({ message }: IMobileMessageListItemProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const router = useRouter()
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
          onClick={() =>
            router.push(`/my-page/message/${conversationId}?target=${targetId}`)
          }
          sx={{ flex: '1 0 100%' }}
        >
          <MessageItemBase message={message} />
        </ListItemButton>
      </SwappableMessageItem>
    </ListItem>
  )
}

export default MobileMessageListItem
