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
      onClose={handleClose}
      title={'쪽지 보내기'} // TODO : 쪽지 보내기 -> 상대방 닉네임으로 변경
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
        targetId={targetId}
        addNewMessage={addNewMessage}
        handleClose={handleClose}
      />
    </CuModal>
  )
}

export default MessageFormModal
