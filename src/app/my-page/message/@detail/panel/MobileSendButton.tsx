import useModal from '@/hook/useModal'
import { IMessage } from '@/types/IMessage'
import * as style from './MobileSendButton.style'
import { Fab, Typography } from '@mui/material'
import SendIcon from '@/icons/SendIcon'
import MessageFormModal from './MessageFormModal'

interface IMobileSendButtonProps {
  disabled: boolean
  target: {
    id: number
    nickname: string
  }
  addNewMessage: (newMessage: IMessage) => void
  // bottomRef: RefObject<HTMLDivElement>
}

const MobileSendButton = ({
  disabled,
  target,
  addNewMessage,
}: IMobileSendButtonProps) => {
  // TODO : 스크롤 감지하여 버튼 바꾸기 (피그마 참고)
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      {/* <Fab
        color="primary"
        onClick={openModal}
        disabled={disabled}
        sx={style.mobileSendIconButton}
      >
        <SendIcon />
      </Fab> */}
      <Fab
        color={disabled ? 'default' : 'primary'}
        onClick={openModal}
        disabled={disabled}
        sx={style.mobileSendButton}
      >
        <SendIcon />
        <Typography variant="Body2">쪽지 보내기</Typography>
      </Fab>
      <MessageFormModal
        isOpen={isOpen}
        target={target}
        addNewMessage={addNewMessage}
        handleClose={closeModal}
      />
    </>
  )
}

export default MobileSendButton
