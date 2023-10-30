'use client'

import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { IMessageInformation } from '@/types/IMessageInformation'
// import useAuthStore from '@/states/useAuthStore'
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
  // const { userId } = useAuthStore()
  const userId = 1
  console.log(nickname)
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

      const data: IMessageData = {
        targetId: storedSelectedUser,
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
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={() => handleClose()}>취소</Button>
        <Button onClick={messageSubmitHandler}>보내기</Button>
      </Box>
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
      const response = await axios.get(
        // `${process.env.NEXT_PUBLIC_API_URL}api/v1/message/searching`,
        'http://localhost:4000/test_options',
        {
          params: {
            keyword,
          },
        },
      )
      setLetterTarget(response.data)
    } catch (error) {
      alert('존재하지 않는 사람입니다.')
    }
  }, [keyword])

  console.log('레터 밖', letterTarget)
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
          {letterTarget && <MenuItems letterTarget={letterTarget} />}
        </Box>
        <MessageForm
          userInfo={letterTarget}
          type={'newMessage'}
          keyword={keyword}
          handleClose={handleClose}
          nickname=""
        />
      </Container>
    </>
  )
}

export default MessageWritingForm
