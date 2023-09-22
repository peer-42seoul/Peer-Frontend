'use client'

import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'

type Props = {
  type: string
  nickname?: string
}
const MessageForm = ({ type, nickname }: Props) => {
  const router = useRouter()
  const [id, setId] = useState(42)
  const [content, setContent] = useState('')

  const messageSubmitHandler = useCallback(async () => {
    try {
      const data: {
        id: number
        content: string
        messageTime: number[]
        messageType: string
        nickname?: string // Make 'nickname' property optional
      } = {
        id: setId(id + 1),
        content,
        messageTime: [2023, 9, 6, 17, 16, 51, 144650000],
        messageType: 'SEND',
      }

      const response = await axios.post(
        'http://localhost:4000/message_userzero', //이 주소도 임시라서 api구성할 때 삭제하기
        type === 'newMessage' ? { ...data, nickname } : data,
      )
      console.log(response)
      setContent('')
      router.push('http://localhost:3000/profile/message')
    } catch (error) {
      console.error(error)
    }
  }, [nickname, content, router, id, type])

  return (
    <>
      <TextField
        value={content}
        placeholder="내용을 입력하세요"
        variant="outlined"
        multiline
        rows={3}
        onChange={(e) => setContent(e.target.value)}
      />
      <Box>
        <Button
          onClick={() => {
            router.push('http://localhost:3000/profile/message')
          }}
        >
          취소
        </Button>
        <Button onClick={messageSubmitHandler}>보내기</Button>
      </Box>
    </>
  )
}

export default MessageForm
