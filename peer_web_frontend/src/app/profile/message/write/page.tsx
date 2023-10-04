'use client'

import { Box, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import MessageForm from './MessageForm'

const MessageWritingForm = ({ isPc, handleClose }: any) => {
  const [nickname, setNickname] = useState('')
  return (
    <>
      <Container>
        <Box>
          <Box>
            <Typography>받는 사람</Typography>
          </Box>
          <TextField
            value={nickname}
            label="받는 사람"
            variant="outlined"
            onChange={(e) => setNickname(e.target.value)}
          />
        </Box>
        <MessageForm
          type={'newMessage'}
          nickname={nickname}
          handleClose={handleClose}
          isPc={isPc}
        />
      </Container>
    </>
  )
}

export default MessageWritingForm
