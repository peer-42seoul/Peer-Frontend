'use client'

import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useMessageInfiniteScroll } from '@/hook/useInfiniteScroll'

interface IMessage {
  userId: number // 이 쪽지의 주인
  msgId: number
  content: string
  date: string
  isEnd: boolean
}

interface IUser {
  userId: number
  userProfile: string
  userNickname: string
}

const MessageForm = ({
  targetId,
  addNewMessage,
}: {
  targetId: number
  addNewMessage: (newMessage: IMessage) => void
}) => {
  const [content, setContent] = useState('')

  const messageSubmit = useCallback(async () => {
    try {
      if (!content) {
        alert('내용을 입력하세요.')
        return
      }
      const messageData = {
        targetId: targetId,
        content,
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/message/back-message`,
        messageData,
        {
          headers: { 'Cache-Control': 'no-store' },
        },
      )
      if (response.status === 201) {
        addNewMessage(response.data.Msg)
        alert('메시지가 성공적으로 전송되었습니다.')
        setContent('')
      }
    } catch (error) {
      // TODO : 에러 구체화
      alert('메시지 전송에 실패하였습니다.')
    }
  }, [content])

  return (
    <Box sx={{ display: 'flex' }}>
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
        <Button onClick={messageSubmit}>보내기</Button>
      </Box>
    </Box>
  )
}

const OwnerMessageItem = ({ message }: { message: IMessage }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Stack sx={{ bgcolor: '#EFEFEF', alignItems: 'flex-end' }}>
        <Typography>{message.content}</Typography>
        <Typography>{message.date}</Typography>
      </Stack>
    </Box>
  )
}

const TargetMessageItem = ({
  message,
  target,
}: {
  message: IMessage
  target: IUser
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Stack sx={{ bgcolor: '#D8D8D8', alignItems: 'flex-start' }} spacing={1}>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <Avatar src={target.userProfile} />
          <Typography sx={{ fontWeight: 'bold' }}>
            {target.userNickname}
          </Typography>
        </Stack>
        <Typography>{message.content}</Typography>
        <Typography>{message.date}</Typography>
      </Stack>
    </Box>
  )
}

interface IMessageItemProps {
  msg: IMessage
  owner: IUser
  target: IUser
}

const MessageItem = ({ msg, owner, target }: IMessageItemProps) => {
  return (
    <>
      {msg.userId === owner.userId ? (
        <OwnerMessageItem message={msg} />
      ) : (
        <TargetMessageItem message={msg} target={target} />
      )}
    </>
  )
}

const MessageChatPage = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const [updatedData, setUpdatedData] = useState<IMessage[] | undefined>()
  const [owner, setOwner] = useState<IUser>()
  const [target, setTarget] = useState<IUser>()
  const [isEnd, setIsEnd] = useState<boolean>(false)

  const fetchMoreData = useCallback(
    async (url: string) => {
      try {
        const response = await axios.post(
          url,
          {
            targetId: searchParams.get('target'),
            conversationalId: params.id,
            earlyMsgId: updatedData?.[0]?.msgId,
          },
          {
            headers: { 'Cache-Control': 'no-store' },
          },
        )
        return response.data.MsgList.Msg
      } catch {
        // TODO : 에러 구체화
        alert('쪽지를 불러오는데 실패하였습니다.')
      }
    },
    [searchParams, params, updatedData],
  )

  const { trigger, data } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/message/conversation-list/more`,
    fetchMoreData,
  )

  useEffect(() => {
    setIsLoading(true)
    const targetId = searchParams.get('target')
    const conversationalId = params.id
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/message/conversation-list`,
        {
          targetId,
          conversationalId,
        },
        {
          headers: { 'Cache-Control': 'no-store' },
        },
      )
      .then((response) => {
        setUpdatedData(response.data.MsgList.Msg)
        setOwner(response.data.MsgList.MsgOwner)
        setTarget(response.data.MsgList.MsgTarget)
      })
      .catch(() => {
        // TODO : 에러 구체화
        alert('쪽지를 불러오는데 실패하였습니다.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [searchParams, params])

  useEffect(() => {
    if (!data) return
    setUpdatedData((prevData: IMessage[] | undefined) => {
      if (!prevData) return data
      return [...data, ...prevData]
    })
    setIsEnd(data[0].isEnd)
  }, [data])

  const { ref, spinner } = useMessageInfiniteScroll({
    trigger, // == mutate
    isEnd,
  })

  const addNewMessage = (newMessage: IMessage) => {
    if (!updatedData) return
    setUpdatedData((prevData: IMessage[] | undefined) => {
      if (!prevData) return [newMessage]
      return [...prevData, newMessage]
    })
  }

  const bottomRef = useRef<HTMLDivElement>()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [updatedData])

  if (isLoading) return <Typography>로딩중... @_@</Typography>
  if (!updatedData || !owner || !target)
    return <Typography>빈 쪽지함 입니다!</Typography>

  return (
    <Box sx={{ width: '100%', height: '90vh' }}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '10%',
          padding: '2rem',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5rem',
          backgroundColor: '#D8D8D8',
        }}
      >
        <Typography>{target.userNickname}</Typography>
      </Box>
      <Box sx={{ width: '100%', height: '90%', overflowY: 'auto' }}>
        <Box
          sx={{
            bottom: 0,
            height: '1vh',
            backgroundColor: 'primary.main',
          }}
          ref={ref}
        ></Box>
        {spinner && <CircularProgress />}
        {updatedData.map((msgObj: IMessage) => (
          <MessageItem
            key={msgObj.msgId}
            msg={msgObj}
            owner={owner}
            target={target}
          />
        ))}
        <Box ref={bottomRef}></Box>
      </Box>
      <MessageForm targetId={target.userId} addNewMessage={addNewMessage} />
    </Box>
  )
}

export default MessageChatPage
