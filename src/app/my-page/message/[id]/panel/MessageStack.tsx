import { IMessage, IMessageUser } from '@/types/IMessage'
import { OwnerMessageItem, TargetMessageItem } from './MessageItem'

interface IMessageStackProps {
  messageData: IMessage[]
  owner: IMessageUser
  target: IMessageUser
}

const MessageStack = ({ messageData, owner, target }: IMessageStackProps) => {
  return (
    <>
      {messageData.map((message: IMessage, index) => {
        const messageOption =
          index === 0
            ? 'TOP'
            : messageData[index - 1].userId === message.userId
              ? 'NEED_EXTRA_MARGIN'
              : 'NORMAL'
        return (
          <>
            {message.userId === owner.userId ? (
              <OwnerMessageItem
                message={message}
                messageOption={messageOption}
              />
            ) : (
              <TargetMessageItem
                message={message}
                messageOption={messageOption}
                target={target}
              />
            )}
          </>
        )
      })}
    </>
  )
}

export default MessageStack
