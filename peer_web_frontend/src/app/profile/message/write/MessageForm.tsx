'use client'

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
  targetId: number
  content: string
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
        targetId: 1, //FIXME: 값을 받는 사람으로 targetId로 수정해야함
        content,
      }
      const url = `/profile/message/new-message`

      const response = await axios.post(
        url, //FIXME:이 주소도 임시라서 api구성할 때 삭제하기
        data,
      )
      setContent('')
      updateMessageData(response.data)
      if (isPc) {
        handleClose()
      } else {
        router.push('http://localhost:3000/profile/message')
      }
    } catch (error) {
      console.error('Message sending error:', error)
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
