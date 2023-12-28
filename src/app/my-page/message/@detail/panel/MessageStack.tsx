import { Fragment } from 'react'
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
            ? 'Top'
            : messageData[index - 1].userId === message.userId
            ? 'Normal'
            : 'Extra'
        return (
          <Fragment key={index}>
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
          </Fragment>
        )
      })}
    </>
  )
}

export default MessageStack
