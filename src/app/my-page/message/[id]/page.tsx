'use client'

import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
import { fetchServerData } from '@/api/fetchers'

interface IMessageData {
  MsgTarget: IUser
  MsgOwner: IUser
  Msg: any[]
}

interface IUser {
  userId: number
  userProfile: string
  userNickname: string
}

interface IMessageUser extends IUser {
  content: string
  date: string
}

interface IMessageItemProps {
  user: IMessageUser
  owner: IUser
  target: IUser
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
        targetId: data.MsgTarget.userId,
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

const OwnerMessageItem = ({ message }: { message: IMessageUser }) => {
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
  message: IMessageUser
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

const MessageItem = ({ user, owner, target }: IMessageItemProps) => {
  return (
    <>
      {user.userId === owner?.userId ? (
        <OwnerMessageItem message={user} />
      ) : (
        <TargetMessageItem message={user} target={target} />
      )}
    </>
  )
}

const MessageChatPage = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams()
  const [updatedData, setUpdatedData] = useState<IMessageData | undefined>()
  const [Owner, setOwner] = useState<IUser>()
  const [Target, setTarget] = useState<IUser>()

  useEffect(() => {
    const targetId = searchParams.get('target')
    const conversationalId = params.id
    axios
      .post(
        `/api/v1/message/conversation-list`,
        {
          targetId,
          conversationalId,
        },
        {
          headers: { 'Cache-Control': 'no-store' },
        },
      )
      .then((response) => {
        setUpdatedData(response.data.MsgList)
        setOwner(response.data.MsgList.MsgOwner)
        setTarget(response.data.MsgList.MsgTarget)
      })
      .catch(() => {
        // TODO : 에러 구체화
        alert('쪽지를 불러오는데 실패하였습니다.')
      })
  }, [searchParams, params])

  // const fetcherWithParams = async (url: string, params: {}) => {
  //   const response = await axios.get(url, { params })
  //   return response.data
  // }
  // FIXME: 해당 부분을 나중에 post로 다 바꿔야함
  // const { data, mutate, isLoading } = useSWR(
  //   `http://localhost:4000/test_detail_${page}`,
  //   fetchServerData, // FIXME: 여기의 userid는 내 uid
  // )
  // console.log('값 까보ㅈ', updatedData?.MsgList?.Msg)
  // const { target, spinner } = useInfiniteScroll({
  //   setPage,
  //   mutate,
  //   pageLimit,
  //   page,
  // })

  // useEffect(() => {
  //   setOwner(data?.MsgList.MsgOwner)
  //   setTarget(data?.MsgList.MsgTarget)

  //   setUpdatedData((prevData: any) => {
  //     return {
  //       ...prevData,
  //       MsgList: {
  //         ...prevData?.MsgList, // 이전 데이터를 그대로 가져오고 새로운 Mag데이터를 추가한다.
  //         Msg: [
  //           ...(prevData?.MsgList?.Msg || []),
  //           ...(data?.MsgList.Msg || []),
  //         ],
  //       },
  //     }
  //   })
  // }, [data])

  // if (isLoading) return <Box>쪽지를 불러오는 중입니다...</Box>
  // if (!data) return <Box>빈 쪽지함 입니다!</Box>
  // console.log('최초 데이터', data.MsgList.MsgOwner)

  if (!updatedData || !Owner || !Target) return <Box>빈 쪽지함 입니다!</Box>

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
        {updatedData.Msg.map((msgObj: any) => (
          <MessageItem
            key={msgObj.msgId}
            user={msgObj}
            owner={Owner}
            target={Target}
          />
        ))}
        {/* {spinner && <CircularProgress />} */}
        <Box
          sx={{
            bottom: 0,
            height: '1vh',
            backgroundColor: 'primary.main',
          }}
          // ref={target}
        />
      </Box>
      <MessageForm data={updatedData} />
    </Box>
  )
}

export default MessageChatPage
