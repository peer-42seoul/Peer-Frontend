'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import MessageNavigator from '@/components/MessageNavigator'
import useMessageStore from '@/states/useMessageStore'
import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import MessageForm from '../MessageForm'
import { IMessagObject, IMessageInformation } from '@/types/IMessageInformation'
import Image from 'next/image'

interface IMessageType {
  senderId: number
  senderNickname: string
  targetProfile: string
  msgId: number
  content: string
  date: string
  isEnd: boolean
}

const MessageContent = ({ user }: { user: IMessageInformation }) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: 100,
          padding: '16px 0 16px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: user.senderId ? 'flex-end' : 'start',
          backgroundColor: user.senderId ? 'lightblue' : '#D8D8D8',
        }}
      >
        <Image
          src={user.senderImage}
          alt="picture_of_sender"
          width={100}
          height={100}
        />
        <Typography>{user.senderNickname}</Typography>
        <Typography>{user.content}</Typography>
        <Typography>{user.date}</Typography>
      </Box>
    </>
  )
}

const MessageChatPage = ({
  messageList,
  isPc,
  image,
}: {
  messageList: IMessageInformation[]
  setPageStatus: boolean
  isPc: boolean
  image?: Array<IMessagObject>
}) => {
  // const router = useRouter()
  // const searchParams = useSearchParams()
  // const search = searchParams.get('search')

  const { storedTargetId } = useMessageStore()
  const [messageData, setMessageData] = useState<IMessageInformation[]>([])
  const [isMessageFormVisible, setMessageFormVisible] = useState(false)

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/message/conversation-list?userId=${storedTargetId}}`, // FIXME : 여기의 userid는 내 uid
    defaultGetFetcher,
  )

  useEffect(() => {
    if (data) {
      const updatedMessageData = data.map(
        (user: IMessageInformation, idx: number) => {
          return {
            ...user,
            senderImage: image?.[idx]?.targetProfile,
            // senderImage: image[idx].targetImage,
          }
        },
      )
      console.log(updatedMessageData, 'updatedMessageData'),
        setMessageData(updatedMessageData)
    }
  }, [data, image])

  if (error) return <Box>쪽지 불러오기를 실패하였습니다.</Box>
  if (isLoading) return <Box>쪽지를 불러오는 중입니다...</Box>
  if (!data) return <Box>빈 쪽지함 입니다!</Box>

  console.log('유저 안 값', messageData)
  return (
    <Container>
      <MessageNavigator title={storedTargetId} messageType={'inchatting'} />
      <Box sx={{ width: '100%' }}>
        {messageData.map((user: IMessageInformation, idx: number) => {
          return <MessageContent key={idx} user={user} />
        })}
        {isMessageFormVisible ? (
          <MessageForm
            targetId={messageData[0].senderId}
            type={'inchatting'}
            keyword={undefined} // TODO: 내 상태
            setMessageData={setMessageData}
            setMessageFormVisible={setMessageFormVisible}
            isPc={true}
          />
        ) : (
          <Button
            sx={{ width: '100%' }}
            onClick={() => {
              setMessageFormVisible((prevValue) => !prevValue)
            }}
          >
            답하기
          </Button>
        )}
      </Box>
    </Container>
  )
}

export default MessageChatPage
