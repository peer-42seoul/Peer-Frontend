'use client'

import { useCallback, useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuToast from '@/components/CuToast'
import useMedia from '@/hook/useMedia'
import useToast from '@/hook/useToast'
import { useMessageInfiniteScroll } from '@/hook/useInfiniteScroll'
import useMessagePageState from '@/states/useMessagePageState'
import { IMessage, IMessageUser, IMessageTargetUser } from '@/types/IMessage'
import MessageForm from './panel/MessageForm'
import MessageContainer from './panel/MessageContainer'
import MessageHeader from './panel/PcHeader'
import MessageStack from './panel/MessageStack'
import MobileSendButton from './panel/MobileSendButton'
import * as style from './page.style'

const MessageChatPage = () => {
  const { conversationId, targetId, setListPage } = useMessagePageState()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [updatedData, setUpdatedData] = useState<IMessage[] | undefined>()
  const [owner, setOwner] = useState<IMessageUser | undefined>()
  const [target, setTarget] = useState<IMessageTargetUser | undefined>()
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [prevScrollHeight, setPrevScrollHeight] = useState<number | undefined>(
    undefined,
  )
  const axiosWithAuth = useAxiosWithAuth()
  const { isPc } = useMedia()
  const { isOpen, toastMessage, openToast, setToastMessage } = useToast()

  const fetchMoreData = useCallback(
    async (url: string) => {
      if (!updatedData) return []
      try {
        const response = await axiosWithAuth.post(url, {
          conversationId,
          targetId,
          earlyMsgId: updatedData[0]?.msgId,
        })
        return response.data.msgList
      } catch {
        // TODO : 에러 구체화
        setToastMessage('쪽지를 불러오는데 실패하였습니다.')
        openToast()
      }
    },
    [conversationId, targetId, updatedData],
  )

  const { trigger, data } = useSWRMutation(
    '/api/v1/message/conversation-list/more',
    fetchMoreData,
  )

  const { targetRef, scrollRef, bottomRef, spinner } = useMessageInfiniteScroll(
    {
      trigger, // == mutate
      isEnd,
    },
  )

  const scrollTo = useCallback(
    (height: number) => {
      if (!scrollRef.current) return
      scrollRef.current.scrollTo({ top: height })
    },
    [scrollRef],
  )

  useEffect(() => {
    setIsLoading(true)
    axiosWithAuth
      .post('/api/v1/message/conversation-list', {
        targetId,
        conversationalId: conversationId,
      })
      .then((response) => {
        setUpdatedData(response.data.msgList)
        setOwner(response.data.msgOwner)
        setTarget(response.data.msgTarget)
        setIsEnd(response.data.msgList[0].isEnd)
      })
      .catch(() => {
        setToastMessage('쪽지를 불러오는데 실패하였습니다.')
        openToast()
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [targetId, conversationId])

  useEffect(() => {
    if (!data) return
    // data : 새로 불러온 데이터 (예전 메시지)
    // currentData : 현재 데이터 (최근 메시지)
    setUpdatedData((currentData: IMessage[] | undefined) => {
      if (!currentData) return data
      return [...data, ...currentData]
    })
    setIsEnd(data[0].isEnd)
    setPrevScrollHeight(scrollRef.current?.scrollHeight)
  }, [data])

  useEffect(() => {
    // FIXME : 깜빡임 현상 해결 필요할듯...
    if (!scrollRef.current || !bottomRef.current) return
    if (prevScrollHeight) {
      scrollTo(scrollRef.current.scrollHeight - prevScrollHeight)
      setPrevScrollHeight(undefined)
      return
    }
    bottomRef.current.scrollIntoView()
  }, [updatedData])

  const addNewMessage = useCallback((newMessage: IMessage) => {
    setUpdatedData((currentData) => {
      if (!currentData) return [newMessage]
      return [...currentData, newMessage]
    })
  }, [])

  const isError = !updatedData || !owner || !target

  return (
    <MessageContainer targetNickname={target ? target.userNickname : '...'}>
      {isPc && (
        <MessageHeader
          targetProfile={target?.userProfile}
          userNickname={target ? target.userNickname : '...'}
        />
      )}
      {isLoading ? (
        // case 1 : 로딩 중
        <CircularProgress sx={style.circularProgress} />
      ) : isError ? (
        // case 2 : 에러
        <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Typography>쪽지함이 비어있습니다.</Typography>
        </Stack>
      ) : (
        // case 3 : 정상
        <>
          <Stack ref={scrollRef} sx={isPc ? style.pcStack : style.mobileStack}>
            <Box ref={targetRef}></Box>
            {spinner && <CircularProgress sx={style.circularProgress} />}
            <MessageStack
              messageData={updatedData}
              owner={owner}
              target={target}
            />
            <Box ref={bottomRef}></Box>
          </Stack>
          {isPc ? (
            <MessageForm
              targetId={target.userId}
              updateTarget={setTarget}
              addNewMessage={addNewMessage}
              disabled={target.deleted}
            />
          ) : (
            <MobileSendButton
              disabled={target.deleted}
              target={{ id: target.userId, nickname: target.userNickname }}
              addNewMessage={addNewMessage}
            />
          )}
        </>
      )}
      <CuToast open={isOpen} onClose={setListPage} severity="error">
        {toastMessage}
      </CuToast>
    </MessageContainer>
  )
}

export default MessageChatPage
