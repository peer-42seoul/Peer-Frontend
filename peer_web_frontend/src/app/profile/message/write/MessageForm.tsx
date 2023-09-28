'use client'

import useMessageStore from '@/states/useMessageStore'
import { IMessageInformation } from '@/types/IMessageInformation'
import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'

interface IProps {
  type: string
  nickname?: string
  setMessageData?: (prevData: any) => void | IMessageInformation[] | undefined
  handleClose?: any | undefined
  isPc: boolean
}

interface IMessageData {
  id: () => number
  content: string
  messageTime: number[]
  messageType: string
  nickname?: string
}

const MessageForm = ({
  type,
  nickname,
  setMessageData,
  handleClose,
  isPc,
}: IProps) => {
  const router = useRouter()
  const id = 42
  const [content, setContent] = useState('')
  const { storeNickname } = useMessageStore()

  const updateMessageData = (newMessage: IMessageInformation) => {
    setMessageData?.((prevData: any) => [...prevData, newMessage])
  }
  const messageSubmitHandler = useCallback(async () => {
    try {
      if (isPc) {
        if (!content) {
          alert('내용을 입력하세요.')
          return
        }
      } else if (!isPc) {
        if (!content || !nickname) {
          alert('내용을 입력하세요.')
          return
        }
      }

      const data: IMessageData = {
        id: id + 1,
        content,
        messageTime: [2023, 9, 6, 17, 16, 51, 144650000],
        messageType: 'SEND',
      }

      const url =
        type === 'newMessage'
          ? `http://localhost:4000/message_${nickname}`
          : `http://localhost:4000/message_${storeNickname}`

      const response = await axios.post(
        url, //FIXME:이 주소도 임시라서 api구성할 때 삭제하기
        type === 'newMessage' ? { ...data, nickname } : data,
      )
      setContent('')
      console.log('Before updateMessageData')
      updateMessageData(response.data)
      {
        isPc
          ? handleClose()
          : router.push('http://localhost:3000/profile/message')
      }
    } catch (error) {
      console.error('메시지 전송  에러', error)
    }
  }, [nickname, content, router, id, type, updateMessageData])

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
            {
              isPc
                ? handleClose()
                : router.push('http://localhost:3000/profile/message')
            }
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
