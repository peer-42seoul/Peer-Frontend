'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import MessageNavigator from '@/components/MessageNavigator'
import useMessageStore from '@/states/useMessageStore'
import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import MessageForm from '../write/MessageForm'
import { IMessagObject, IMessageInformation } from '@/types/IMessageInformation'
import Image from 'next/image'

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
  selectedStatus,
  isPc,
  image,
}: {
  selectedStatus: boolean
  isPc: boolean
  image?: Array<IMessagObject>
}) => {
  // const router = useRouter()
  // const searchParams = useSearchParams()
  // const search = searchParams.get('search')

  console.log(image, 'imaggg')
  const { storeNickname } = useMessageStore()
  const [messageData, setMessageData] = useState<IMessageInformation[]>([])

  console.log
  const { data, error, isLoading } = useSWR(
    // selectedStatus
    //   ? // ? 'http://localhost:4000//profile/message?target=${storeNickname}' //FIXME: 나중에 얘로 설정해야 함
    storeNickname
      ? `http://localhost:4000/profile_message_${storeNickname}`
      : null,
    // : null,
    defaultGetFetcher,
  )

  // useEffect(() => {
  //   messageData.map((user: IMessageInformation, idx: number) => {
  //     user.senderImage = image[idx].targetImage
  //   })
  // }, [image])
  //FIXME: selectedStatus는 아마 store사용하기 이전에 값 관리 때문에 쓰려던 거 같은데 얘 존재 확인하고 삭제하기
  useEffect(() => {
    console.log('image', image)
    console.log('data', data)

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
  if (!data) return <Box>빈 쪽지함 입니다!</Box>
  if (isLoading) return <Box>쪽지를 불러오는 중입니다...</Box>

  return (
    <Container>
      <MessageNavigator title={storeNickname} messageType={'inchatting'} />
      <Box sx={{ width: '100%' }}>
        {messageData.map((user: IMessageInformation, idx: number) => {
          return <MessageContent key={idx} user={user} />
        })}
        {isPc && (
          <MessageForm
            type={'existingMessage'}
            nickname={undefined} // TODO: 내 상태
            setMessageData={setMessageData}
            isPc={true}
          />
        )}
      </Box>
    </Container>
  )
}

export default MessageChatPage
