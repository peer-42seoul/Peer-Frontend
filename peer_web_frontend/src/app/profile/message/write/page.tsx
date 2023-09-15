'use client'

import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import MessageForm from './MessageForm'

const WriteForm = () => {
  const [nickname, setNickname] = useState('')

  return (
    <Container>
      <Box>
        <Box>
          <Typography>받는 사람</Typography>
          <Button>팀 리스트</Button>
        </Box>
        <TextField
          value={nickname}
          label="받는 사람"
          variant="outlined"
          onChange={(e) => setNickname(e.target.value)}
        />
      </Box>
      <MessageForm type={'newMessage'} nickname={nickname} />
    </Container>
  )
}

export default WriteForm
