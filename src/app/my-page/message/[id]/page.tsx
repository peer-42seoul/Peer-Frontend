'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { Box, CircularProgress, Typography } from '@mui/material'
// import useAxiosWithAuth from '@/api/config'
import { useMessageInfiniteScroll } from '@/hook/useInfiniteScroll'
import { IMessage, IMessageUser } from '@/types/IMessage'
import MessageItem from './panel/MessageItem'
import MessageForm from './panel/MessageForm'

// MOCK API
import axios from 'axios'

const MessageChatPage = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const [updatedData, setUpdatedData] = useState<IMessage[] | undefined>()
  const [owner, setOwner] = useState<IMessageUser>()
  const [target, setTarget] = useState<IMessageUser>()
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [prevScrollHeight, setPrevScrollHeight] = useState<number | undefined>(
    undefined,
  )
  // const axiosWithAuth = useAxiosWithAuth()

  const fetchMoreData = useCallback(
    async (url: string) => {
      try {
        const response = await axios.post(url, {
          targetId: searchParams.get('target'),
          conversationalId: params.id,
          earlyMsgId: updatedData?.[0]?.msgId,
        })
        return response.data.MsgList.Msg
      } catch {
        // TODO : 에러 구체화
        alert('쪽지를 불러오는데 실패하였습니다.')
      }
    },
    [searchParams, params, updatedData],
  )

  const { trigger, data } = useSWRMutation(
    '/api/v1/message/conversation-list/more',
    fetchMoreData,
  )

  const { targetRef, scrollRef, spinner } = useMessageInfiniteScroll({
    trigger, // == mutate
    isEnd,
  })

  const scrollTo = useCallback(
    (height: number) => {
      if (!scrollRef.current) return
      scrollRef.current.scrollTo({ top: height })
    },
    [scrollRef],
  )

  useEffect(() => {
    setIsLoading(true)
    const targetId = searchParams.get('target')
    const conversationalId = params.id
    axios
      .post('/api/v1/message/conversation-list', {
        targetId,
        conversationalId,
      })
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
    setPrevScrollHeight(scrollRef.current?.scrollHeight)
  }, [data])

  useEffect(() => {
    // FIXME : 깜빡임 현상 해결 필요할듯...
    if (!scrollRef.current) return
    if (prevScrollHeight) {
      scrollTo(scrollRef.current.scrollHeight - prevScrollHeight)
      setPrevScrollHeight(undefined)
      return
    }
    scrollTo(scrollRef.current.scrollHeight - scrollRef.current.clientHeight)
  }, [updatedData])

  const addNewMessage = (newMessage: IMessage) => {
    if (!updatedData) return
    setUpdatedData((prevData: IMessage[] | undefined) => {
      if (!prevData) return [newMessage]
      return [...prevData, newMessage]
    })
  }

  if (isLoading) return <Typography>로딩중... @_@</Typography>
  if (!updatedData || !owner || !target)
    return <Typography>빈 쪽지함 입니다!</Typography>

  return (
    <Box sx={{ width: '100%', height: '50vh' }}>
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
      <Box
        ref={scrollRef}
        sx={{ width: '100%', height: '90%', overflowY: 'auto' }}
      >
        <Box ref={targetRef}></Box>
        {spinner && <CircularProgress />}
        {updatedData.map((msgObj: IMessage) => (
          <MessageItem
            key={msgObj.msgId}
            msg={msgObj}
            owner={owner}
            target={target}
          />
        ))}
      </Box>
      <MessageForm targetId={target.userId} addNewMessage={addNewMessage} />
    </Box>
  )
}

export default MessageChatPage
