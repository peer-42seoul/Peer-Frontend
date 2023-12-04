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
        const needExtraMargin =
          index !== 0 && messageData[index - 1].userId === message.userId
        return (
          <>
            {message.userId === owner.userId ? (
              <OwnerMessageItem
                message={message}
                needExtraMargin={needExtraMargin}
              />
            ) : (
              <TargetMessageItem
                message={message}
                needExtraMargin={needExtraMargin}
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
