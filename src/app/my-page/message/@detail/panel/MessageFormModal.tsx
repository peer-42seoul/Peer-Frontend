// 모바일에서 보이는 쪽지 작성 모달
import CuModal from '@/components/CuModal'
import { IMessage } from '@/types/IMessage'
import MessageForm from './MessageForm'

interface IMessageFormModalProps {
  messageSendState: {
    isMessageSending: boolean
    setIsMessageSending: (value: boolean) => void
  }
  isOpen: boolean
  target: {
    id: number
    nickname: string
  }
  addNewMessage: (newMessage: IMessage) => void
  handleClose: () => void
}

const MessageFormModal = ({
  messageSendState,
  isOpen,
  target,
  addNewMessage,
  handleClose,
}: IMessageFormModalProps) => {
  return (
    <CuModal
      open={isOpen}
      onClose={handleClose}
      title={target.nickname}
      mobileFullSize
      containedButton={{
        isLoading: messageSendState.isMessageSending,
        text: '보내기',
        type: 'submit',
        form: 'message-form',
      }}
      textButton={{
        text: '취소',
        onClick: handleClose,
      }}
    >
      <MessageForm
        messageSendState={messageSendState}
        targetId={target.id}
        addNewMessage={addNewMessage}
        handleClose={handleClose}
      />
    </CuModal>
  )
}

export default MessageFormModal
