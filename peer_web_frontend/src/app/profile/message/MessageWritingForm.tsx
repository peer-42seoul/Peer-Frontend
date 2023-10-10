'use client'

import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { IMessageInformation } from '@/types/IMessageInformation'
import useAuthStore from '@/states/useAuthStore'

interface IProps {
  userInfo: {
    targetId: number
    targetNickname: string
    targetProfile: string
  }
  type: string
  keyword?: string
  setMessageData?: (prevData: any) => void | IMessageInformation[] | undefined
  handleClose?: any | undefined
  isPc: boolean
}

interface IMessageData {
  targetId: number
  content: string
}

interface IuserInfo {
  targetId: number
  targetNickname: string
  targetProfile: string
}

const MessageForm = ({
  userInfo,
  type,
  keyword,
  setMessageData,
  handleClose,
}: IProps) => {
  const router = useRouter()
  const [content, setContent] = useState('')
  const { userId } = useAuthStore()

  const updateMessageData = (newMessage: IMessageInformation) => {
    setMessageData?.((prevData: any) => [...prevData, newMessage])
  }
  const messageSubmitHandler = useCallback(async () => {
    // userInfo.targetId = 1
    try {
      if (!content) {
        alert('내용을 입력하세요.')
        return
      } else if (!keyword || !userInfo) {
        alert('받는 사람을 입력하세요.')
        return
      }

      const data: IMessageData = {
        targetId: userInfo.targetId,
        content,
      }
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/v1/message/new-message?userId=${userId}`
      // const url = `/api/v1/message/new-message?userId=${1}`

      const response = await axios.post(
        url, //FIXME:이 주소도 임시라서 api구성할 때 삭제하기
        data,
      )
      setContent('')
      updateMessageData(response.data)
      handleClose()
    } catch (error) {
      alert('쪽지 전송에 실패하였습니다. 다시 시도해주세요.')
    }
  }, [keyword, content, router, id, type, updateMessageData])

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
        <Button onClick={() => handleClose()}>취소</Button>
        <Button onClick={messageSubmitHandler}>보내기</Button>
      </Box>
    </>
  )
}

const MessageWritingForm = ({ handleClose }: any) => {
  const [keyword, setKeyword] = useState('')
  const [userInfo, setUserInfo] = useState<IuserInfo | null>(null)

  const searchUserWithKeyword = useCallback(async () => {
    if (!keyword) {
      alert('검색어를 입력하세요.')
      return
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/message/searching`,
        {
          params: {
            keyword,
          },
        },
      )

      setUserInfo(response.data)
    } catch (error) {
      alert('존재하지 않는 사람입니다.')
    }
  }, [keyword])

  return (
    <>
      <Container>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>받는 사람</Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ width: '100%' }}
              value={keyword}
              placeholder="닉네임 혹은 이메일을 입력하세요"
              variant="outlined"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button onClick={searchUserWithKeyword}>검색</Button>
          </Box>
        </Box>
        <MessageForm
          userInfo={userInfo}
          type={'newMessage'}
          keyword={keyword}
          handleClose={handleClose}
        />
      </Container>
    </>
  )
}

export default MessageWritingForm
