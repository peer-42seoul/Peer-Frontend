import { Stack } from '@mui/material'
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
        const marginType =
          index === 0
            ? 'Top'
            : messageData[index - 1].userId === message.userId
              ? 'NotFirst'
              : 'First'
        return (
          <>
            {message.userId === owner.userId ? (
              <OwnerMessageItem message={message} marginType={marginType} />
            ) : (
              <TargetMessageItem
                message={message}
                marginType={marginType}
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
