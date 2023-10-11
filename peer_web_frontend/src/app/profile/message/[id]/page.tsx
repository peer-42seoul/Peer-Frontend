'use client'

// import { defaultGetFetcher, messageFetcher } from '@/api/fetchers'
// import useMessageStore from '@/states/useMessageStore'
import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useState } from 'react'
import useSWR from 'swr'
import MessageForm from '../MessageForm'
import { IMessageInformation } from '@/types/IMessageInformation'
import Image from 'next/image'
// import useAuthStore from '@/states/useAuthStore'
import axios from 'axios'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
// import { update } from 'lodash'

const MessageContent = ({
  user,
  data,
  profile,
  userId,
}: {
  user: IMessageInformation
  data: any
  profile: string
  userId: number
}) => {
  console.log('메세지 컨텐츠가 받아온 데이터 ')
  return (
    <>
      <Box
        sx={{
          width: '30%',
          height: 100,
          padding: '16px 0 16px 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: data.senderId === userId ? 'flex-end' : 'start',
          backgroundColor: data.senderId === userId ? 'lightblue' : '#D8D8D8',
        }}
      >
        <Image
          src={profile}
          alt="picture_of_sender"
          width={50}
          height={50}
          style={{ borderRadius: '50%' }}
        />
        <Typography>{user.senderNickname}</Typography>
        <Typography>{user.content}</Typography>
        <Typography>{user.date}</Typography>
      </Box>
    </>
  )
}

const MessageChatPage = () =>
  //{} // messageList,
  // isPc,
  // image,
  // : {
  //   messageList: IMessageInformation[]
  //   setPageStatus: boolean
  //   isPc: boolean
  //   image?: Array<IMessagObject>
  // }

  {
    // const router = useRouter()
    // const searchParams = useSearchParams()
    // const search = searchParams.get('search')

    // const { storedTargetId, storedConversationalId } = useMessageStore()
    // const { userId } = useAuthStore()
    const userId = 42
    const [messageData, setMessageData] = useState<IMessageInformation[]>([])
    // const [isMessageFormVisible, setMessageFormVisible] = useState(false)
    const [page, setPage] = useState<number>(1)
    const pageLimit = 5

    const fetcherWithParams = async (url: string, params: {}) => {
      const response = await axios.get(url, { params })
      return response.data
    }

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

    // const { data, error, isLoading } = useSWR(
    //   [
    //     `${process.env.NEXT_PUBLIC_API_URL}api/v1/message/conversation-list?userId=${userId}}`,
    //     {
    //       targetId: storedTargetId,
    //       conversationalId: storedConversationalId,
    //     },
    //   ],
    //   fetcherWithParams, // FIXME: 여기의 userid는 내 uid
    // )

    // useEffect(() => {
    //   if (data) {
    //     setMessageData((prevMessageData) => [...prevMessageData, ...data.Msg])
    //   }
    //   console.log('데이터는', data)
    // }, [data])

    // if (error) return <Box>쪽지 불러오기를 실패하였습니다.</Box>
    if (isLoading) return <Box>쪽지를 불러오는 중입니다...</Box>
    if (!data) return <Box>빈 쪽지함 입니다!</Box>
    console.log('최초 데이터', data)
    return (
      <Box sx={{ width: '100%', height: '100vh' }}>
        <Box sx={{ width: '100%', height: '90%', overflowY: 'auto' }}>
          {messageData.map((user: IMessageInformation, idx: number) => {
            return (
              <MessageContent
                key={idx}
                data={data}
                user={user}
                profile={data.targetProfile}
                userId={userId}
              />
            )
          })}
          <Box
            sx={{
              bottom: 0,
              height: '1vh',
              backgroundColor: 'primary.main',
            }}
            ref={target}
          />
        </Box>
        <MessageForm
          // targetId={messageData[0].senderId}
          type={'inChatting'}
          keyword={undefined} // TODO: 내 상태
          setMessageData={setMessageData}
          setMessageFormVisible={setMessageFormVisible}
          isPc={true}
        />
        {spinner && <CircularProgress />}
      </Box>
    )
  }

export default MessageChatPage
