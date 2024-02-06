import { RefObject, useCallback, useEffect, useState } from 'react'
import { throttle } from 'lodash'
import { Fab, Typography, Fade, Stack } from '@mui/material'
import useModal from '@/hook/useModal'
import SendIcon from '@/icons/SendIcon'
import { IMessage } from '@/types/IMessage'
import MessageFormModal from './MessageFormModal'
import * as style from './MobileSendButton.style'

interface IMobileSendButtonProps {
  messageSendState: {
    isMessageSending: boolean
    setIsMessageSending: (value: boolean) => void
  }
  disabled: boolean
  target: {
    id: number
    nickname: string
  }
  addNewMessage: (newMessage: IMessage) => void
  scrollRef: RefObject<HTMLDivElement>
}

const SCROLL_OFFSET = 5 // 버튼이 바뀌는 스크롤 위치 (px)
const SCROLL_THROTTLE = 500 // 스크롤 감지 주기 (ms) // TODO : 의도한대로 동작하는지 확인 필요함.

const MobileSendButton = ({
  messageSendState,
  disabled,
  target,
  addNewMessage,
  scrollRef,
}: IMobileSendButtonProps) => {
  // TODO : 스크롤 감지하여 버튼 바꾸기 (피그마 참고)
  const { isOpen, openModal, closeModal } = useModal()
  const [buttonType, setButtonType] = useState<'ICON' | 'TEXT'>('ICON')

  const checkScrollPosition = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollHeight, scrollTop, clientHeight } = scrollRef.current
    if (clientHeight + scrollTop >= scrollHeight - SCROLL_OFFSET) {
      setButtonType('TEXT')
    } else {
      setButtonType('ICON')
    }
  }, [scrollRef])

  const handleScroll = useCallback(() => {
    throttle(checkScrollPosition, SCROLL_THROTTLE)()
  }, [])

  useEffect(() => {
    const scrollRefCurrent = scrollRef.current
    if (!scrollRefCurrent) return
    scrollRefCurrent.addEventListener('scroll', handleScroll)
    return () => {
      if (!scrollRefCurrent) return
      scrollRefCurrent.removeEventListener('scroll', handleScroll)
    }
  }, [scrollRef])

  return (
    <>
      <Fade in={buttonType === 'ICON'}>
        <Fab
          color={disabled ? 'default' : 'primary'}
          onClick={openModal}
          disabled={disabled}
          sx={style.mobileSendIconButton}
        >
          <SendIcon />
        </Fab>
      </Fade>
      <Fade in={buttonType === 'TEXT'}>
        <Fab
          color={disabled ? 'default' : 'primary'}
          onClick={openModal}
          disabled={disabled}
          sx={style.mobileSendButton}
        >
          <Stack direction={'row'} spacing={'0.25rem'}>
            <SendIcon />
            <Typography variant="Body2">쪽지 보내기</Typography>
          </Stack>
        </Fab>
      </Fade>
      <MessageFormModal
        messageSendState={messageSendState}
        isOpen={isOpen}
        target={target}
        addNewMessage={addNewMessage}
        handleClose={closeModal}
      />
    </>
  )
}

export default MobileSendButton
