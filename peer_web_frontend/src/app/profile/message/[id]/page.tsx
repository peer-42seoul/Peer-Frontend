'use client'

// import { defaultGetFetcher, messageFetcher } from '@/api/fetchers'
// import useMessageStore from '@/states/useMessageStore'
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import axios from 'axios'
import useInfiniteScroll from '@/hook/useInfiniteScroll'

interface IMessageData {
  MsgList: {
    MsgTarget: IUser
    MsgOwner: IUser
    Msg: []
    // Other properties...
  }
}

interface IUser {
  userId?: string
  userProfile?: string
  userNickname?: string
}

interface IMessageItemProps {
  user: IUser & { content?: string; date?: string }
  Owner?: IUser
  Target?: IUser
}
const MessageForm = ({ data }: { data: IMessageData }) => {
  const [content, setContent] = useState('')

  const messageSubmit = useCallback(async () => {
    try {
      if (!content) {
        alert('내용을 입력하세요.')
        return
      }
      const messageData = {
        targetId: data.MsgList.MsgTarget.userId,
        content,
      }

      setContent('')
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/v1/message/back-message?userId=${data.MsgList.MsgOwner.userId}`

      const response = await axios.post(url, messageData)
      if (response.status === 201) {
        alert('메시지가 성공적으로 전송되었습니다.')
      }
    } catch (error) {
      alert('메시지 전송에 실패하였습니다.')
    }
  }, [content, data])

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

const MessageItem = ({ user, Owner, Target }: IMessageItemProps) => {
  return (
    <>
      {user.userId === Owner?.userId ? (
        <Box
          key={user.userId}
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            margin: '1rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '35rem',
              padding: '1rem', // Corrected padding syntax
              alignItems: 'flex-end', // Corrected value and removed the extra comma
              background: '#EFEFEF',
            }}
          >
            <Image
              style={{ borderRadius: '50%' }}
              width={100}
              height={100}
              src={Owner.userProfile}
              alt="picture_of_owner"
            />
            <Typography sx={{ fontWeight: 'bold' }}>
              {Owner?.userNickname}
            </Typography>
            <Typography>{user.content}</Typography>
            <Typography>{user.date}</Typography>
          </Box>
        </Box>
      ) : (
        <Box
          key={user.userId}
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-start',
            margin: '1rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '35rem',
              padding: '0.5rem 1rem 1rem 0.5rem',
              background: '#EFEFEF',
            }}
          >
            <Image
              style={{ borderRadius: '50%' }}
              width={100}
              height={100}
              src={Target?.userProfile}
              alt="picture_of_target"
            />
            <Typography sx={{ fontWeight: 'bold' }}>
              {Target?.userNickname}
            </Typography>
            <Typography>{user.content}</Typography>
            <Typography>{user.date}</Typography>
          </Box>
        </Box>
      )}
    </>
  )
}

const MessageChatPage = () => {
  const [updatedData, setUpdatedData] = useState<IMessageData>()
  const [page, setPage] = useState<number>(1)
  const pageLimit = 3
  const [Owner, setOwner] = useState<IUser>()
  const [Target, setTarget] = useState<IUser>()

  const fetcherWithParams = async (url: string, params: {}) => {
    const response = await axios.get(url, { params })
    return response.data
  }
  // FIXME: 해당 부분을 나중에 post로 다 바꿔야함
  const { data, mutate, isLoading } = useSWR(
    `http://localhost:4000/test_detail_${page}`,
    fetcherWithParams, // FIXME: 여기의 userid는 내 uid
  )

  const { target, spinner } = useInfiniteScroll({
    setPage,
    mutate,
    pageLimit,
    page,
  })

  useEffect(() => {
    setOwner(data?.MsgList.MsgOwner)
    setTarget(data?.MsgList.MsgTarget)

    setUpdatedData((prevData: any) => {
      return {
        ...prevData,
        MsgList: {
          ...prevData?.MsgList, // 이전 데이터를 그대로 가져오고 새로운 Mag데이터를 추가한다.
          Msg: [
            ...(prevData?.MsgList?.Msg || []),
            ...(data?.MsgList.Msg || []),
          ],
        },
      }
    })
  }, [data])

  if (isLoading) return <Box>쪽지를 불러오는 중입니다...</Box>
  if (!data) return <Box>빈 쪽지함 입니다!</Box>
  console.log('최초 데이터', data.MsgList.MsgOwner)
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
        <Typography>{Target?.userNickname}</Typography>
      </Box>
      <Box sx={{ width: '100%', height: '90%', overflowY: 'auto' }}>
        {updatedData?.MsgList?.Msg.map((user: any) => (
          <MessageItem
            key={user.id}
            user={user}
            Owner={Owner}
            Target={Target}
          />
        ))}
        {spinner && <CircularProgress />}
        <Box
          sx={{
            bottom: 0,
            height: '1vh',
            backgroundColor: 'primary.main',
          }}
          ref={target}
        />
      </Box>
      <MessageForm data={data} />
    </Box>
  )
}

export default MessageChatPage
