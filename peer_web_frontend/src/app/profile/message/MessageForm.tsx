'use client'

import useAuthStore from '@/states/useAuthStore'
import { IMessageInformation } from '@/types/IMessageInformation'
import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'

interface IProps {
  targetId: number
  type: string
  keyword?: string
  setMessageData?: (prevData: any) => void | IMessageInformation[] | undefined
  handleClose?: any | undefined
  setMessageFormVisible?: any | undefined
  isPc: boolean
}

interface IMessageData {
  targetId: number
  content: string
}

const MessageForm = ({
  type,
  targetId,
  keyword,
  setMessageData,
  setMessageFormVisible,
  handleClose,
  isPc,
}: IProps) => {
  const router = useRouter()
  const { userId } = useAuthStore()
  const [content, setContent] = useState('')

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
        if (!content || !keyword) {
          alert('내용을 입력하세요.')
          return
        }
      }

      const data: IMessageData = {
        targetId,
        content,
      }
      const url =
        type === 'inChatting'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/message/back-message?userId=${userId}`
          : `${process.env.NEXT_PUBLIC_API_URL}api/v1/message/new-message?userId=${userId}`

      const response = await axios.post(
        url, //FIXME:이 주소도 임시라서 api구성할 때 삭제하기
        data,
      )
      setContent('')
      updateMessageData(response.data)
      handleClose()
    } catch (error) {
      console.error('Message sending error:', error)
    }
  }, [keyword, content, router, updateMessageData])

  return (
    <>
      <TextField
        sx={{ width: '100%' }}
        value={content}
        placeholder="내용을 입력하세요"
        variant="outlined"
        multiline
        rows={3}
        onChange={(e) => setContent(e.target.value)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          onClick={() => {
            type === 'inchatting'
              ? setMessageFormVisible((prevValue: boolean) => !prevValue)
              : handleClose()
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
