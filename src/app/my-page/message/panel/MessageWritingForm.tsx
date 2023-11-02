'use client'

import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { IMessageInformation } from '@/types/IMessageInformation'
import useMessageStore from '@/states/useMessageStore'
import Image from 'next/image'

interface IProps {
  userInfo?: ILetterTarget
  type: string
  nickname: string | undefined
  keyword?: string
  setMessageData?: (prevData: any) => void | IMessageInformation[] | undefined
  handleClose?: any | undefined
}

interface IMessageData {
  targetId: number
  content: string
}

export interface ILetterTarget {
  targetId: number
  targetEmail: string
  targetNickname: string
  targetProfile: string
}

function MenuItems({ letterTarget }: any) {
  const selectMessageTarget = (targetId: number) => {
    console.log('targetId', targetId)
    useMessageStore.setState({
      storedSelectedUser: targetId,
    })
  }
  console.log(`이미지 값`, letterTarget[0].targetProfile)
  return (
    <Box>
      {letterTarget.map((item: any) => {
        return (
          <>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  ':hover': { backgroundColor: '#e6e6e6' },
                }}
                onClick={() => selectMessageTarget(item.targetId)}
                key={item.targetId}
              >
                <Image
                  src={`${letterTarget[0].targetProfile}`}
                  alt="picture_of_sender"
                  width={100}
                  height={100}
                  style={{ borderRadius: '50%' }}
                ></Image>
                <Box>
                  {item.targetNickname ? (
                    <span>{item.targetNickname}</span>
                  ) : (
                    <span>{item.targetEmail}</span>
                  )}
                </Box>
              </Box>
            </Box>
          </>
        )
      })}
    </Box>
  )
}

const MessageForm = ({
  userInfo,
  type,
  keyword,
  setMessageData,
  nickname,
  handleClose,
}: IProps) => {
  const router = useRouter()
  const [content, setContent] = useState('')
  const { storedSelectedUser } = useMessageStore()
  const updateMessageData = (newMessage: IMessageInformation) => {
    setMessageData?.((prevData: any) => [...prevData, newMessage])
  }
  const messageSubmitHandler = useCallback(async () => {
    try {
      if (!content) {
        alert('내용을 입력하세요.')
        return
      } else if (!keyword || !userInfo) {
        alert('받는 사람을 입력하세요.')
        return
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/message/new-message`,
        {
          body: {
            targetId: storedSelectedUser,
            content,
          },
        },
      )
      setContent('')
      updateMessageData(response.data)
      handleClose()
    } catch (error) {
      alert('쪽지 전송에 실패하였습니다. 다시 시도해주세요.')
    }
  }, [keyword, content, router, type, updateMessageData])

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
      <Stack direction={'row'} justifyContent={'space-around'} spacing={3}>
        <Button variant="contained" onClick={() => handleClose()}>
          취소
        </Button>
        <Button variant="contained" onClick={messageSubmitHandler}>
          보내기
        </Button>
      </Stack>
    </>
  )
}

const MessageWritingForm = ({ handleClose }: any) => {
  const [keyword, setKeyword] = useState('')
  const [letterTarget, setLetterTarget] = useState<ILetterTarget | undefined>()

  //TODO: 반환된 검색 결과 state 에 실어서 보내기 (받는 사람 정보)

  const searchUserWithKeyword = useCallback(async () => {
    if (!keyword) {
      alert('검색어를 입력하세요.')
      return
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/message/searching`,
        {
          body: {
            keyword,
          },
        },
      )
      setLetterTarget(response.data)
    } catch (error) {
      alert('존재하지 않는 사람입니다.')
    }
  }, [keyword])

  return (
    <Stack alignItems={'center'} spacing={2}>
      <Typography>새 쪽지</Typography>
      <Stack direction={'row'} alignItems={'stretch'} sx={{ width: '100%' }}>
        <TextField
          sx={{ width: '100%' }}
          value={keyword}
          placeholder="닉네임 혹은 이메일을 입력하세요"
          variant="outlined"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={searchUserWithKeyword}>검색</Button>
      </Stack>
      {letterTarget && <MenuItems letterTarget={letterTarget} />}
      <MessageForm
        userInfo={letterTarget}
        type={'newMessage'}
        keyword={keyword}
        handleClose={handleClose}
        nickname=""
      />
    </Stack>
  )
}

export default MessageWritingForm
