import React from 'react'
import MessageForm from '../write/MessageForm'
import { useMediaQuery } from '@mui/material'

const MessageViewPage = () => {
  const isPc = useMediaQuery('(min-width:481px)')

  return (
    <>
      <MessageForm type={'existingMessage'} nickname={undefined} isPc={isPc} />
    </>
  )
}

export default MessageViewPage
