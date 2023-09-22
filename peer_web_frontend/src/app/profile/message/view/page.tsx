import React from 'react'
import MessageForm from '../write/MessageForm'

const MessageViewPage = () => {
  return (
    <>
      <MessageForm type={'existingMessage'} nickname={undefined} />
    </>
  )
}

export default MessageViewPage
