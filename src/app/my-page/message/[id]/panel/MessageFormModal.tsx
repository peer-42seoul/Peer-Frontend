// 모바일에서 보이는 쪽지 작성 모달
import CuModal from '@/components/CuModal'
import { IMessage } from '@/types/IMessage'
import MessageForm from './MessageForm'

interface IMessageFormModalProps {
  isOpen: boolean
  targetId: number
  addNewMessage: (newMessage: IMessage) => void
  handleClose: () => void
}

const MessageFormModal = ({
  isOpen,
  targetId,
  addNewMessage,
  handleClose,
}: IMessageFormModalProps) => {
  return (
    <CuModal
      open={isOpen}
      handleClose={handleClose}
      ariaTitle={'create_message'}
      ariaDescription={'create_message'}
    >
      <MessageForm
        view={'MOBILE_VIEW'}
        targetId={targetId}
        addNewMessage={addNewMessage}
        handleClose={handleClose}
      />
    </CuModal>
  )
}

export default MessageFormModal
