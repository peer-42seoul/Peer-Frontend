import React from 'react'
import MessageForm from '../write/MessageForm'

const View = () => {
  return (
    <>
      <h1>view</h1>
      <MessageForm type={'existingMessage'} nickname={undefined} />
    </>
  )
}

export default View
