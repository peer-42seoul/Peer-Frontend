'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import MessageNavigator from '@/components/MessageNavigator'
import useMessageStore from '@/states/useMessageStore'
import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import MessageForm from '../write/MessageForm'
import { IMessageInformation } from '@/types/IMessageInformation'
import Image from 'next/image'

const MessageContent = ({ user }: { user: IMessageInformation }) => {
  return (
    <>
      {user.messageType === 'RECEIVE' && (
        <Box
          sx={{
            width: '100%',
            height: 100,
            padding: '16px 0 16px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: '#D8D8D8',
          }}
        >
          <Image
            src="https://source.unsplash.com/random/100×100"
            alt="picture_of_sender"
            width={100}
            height={100}
          />
          <Typography>{user.nickname}</Typography>
          <Typography>{user.content}</Typography>
        </Box>
      )}
      {user.messageType === 'SEND' && (
        <Box
          sx={{
            width: '100%',
            height: 100,
            padding: '16px 0 16px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            backgroundColor: 'lightblue',
          }}
        >
          <Typography>{user.nickname}</Typography>
          <Typography>{user.content}</Typography>
        </Box>
      )}
    </>
  )
}

const MessageChatPage = ({
  selectedStatus,
  isPc,
}: {
  selectedStatus: boolean
  isPc: boolean
}) => {
  // const router = useRouter()
  // const searchParams = useSearchParams()
  // const search = searchParams.get('search')
  const { storeNickname } = useMessageStore()
  const [messageData, setMessageData] = useState<IMessageInformation[]>([])

  console.log('selected', selectedStatus)
  const { data, error, isLoading } = useSWR(
    // selectedStatus
    //   ? // ? 'http://localhost:4000/message/nickname?search=' + storeNickname //FIXME: 나중에 얘로 설정해야 함
    storeNickname ? `http://localhost:4000/message_${storeNickname}` : null,
    // : null,
    defaultGetFetcher,
  )

  //FIXME: selectedStatus는 아마 store사용하기 이전에 값 관리 때문에 쓰려던 거 같은데 얘 존재 확인하고 삭제하기
  console.log('call', `http://localhost:4000/message_ + ${storeNickname}`)
  useEffect(() => {
    if (data) {
      setMessageData(data)
    }
  }, [data])
  if (error) return <Box>쪽지 불러오기를 실패하였습니다.1</Box>
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
