// 모바일에서 보이는 쪽지 작성 모달
import CuModal from '@/components/CuModal'
import { IMessage } from '@/types/IMessage'
import MessageForm from './MessageForm'

interface IMessageFormModalProps {
  isOpen: boolean
  target: {
    id: number
    nickname: string
  }
  addNewMessage: (newMessage: IMessage) => void
  handleClose: () => void
}

const MessageFormModal = ({
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
        view={'MOBILE_VIEW'}
        targetId={target.id}
        addNewMessage={addNewMessage}
        handleClose={handleClose}
      />
    </CuModal>
  )
}

export default MessageFormModal
