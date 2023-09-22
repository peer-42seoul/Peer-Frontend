'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import MessageNavigator from '@/components/MessageNavigator'
import useMessageStore from '@/states/useMessageStore'
import { Box, Container, Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { IMessageInformation } from '@/types/IUserProfile'
import Image from 'next/image'
import MessageForm from '../../message/write/MessageForm'

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

const Test = (
  { selectedStatus }: { selectedStatus: boolean },
  isPc: boolean,
  props: any,
) => {
  console.log('prop', props)
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('_')
  const { storeNickname } = useMessageStore()
  const [messageData, setMessageData] = useState<IMessageInformation[]>([])

  const { data, error, isLoading } = useSWR(
    selectedStatus
      ? // ? 'http://localhost:4000/message/nickname?search=' + storeNickname //FIXME: 나중에 얘로 설정해야 함
        'http://localhost:4000/message_' + search
      : null,
    defaultGetFetcher,
  )

  useEffect(() => {
    if (data) {
      setMessageData(data)
    }
  }, [data])
  if (error) return <Box>쪽지 불러오기를 실패하였습니다.</Box>
  if (!data) return <Box>빈 쪽지함 입니다.</Box>
  if (isLoading) return <Box>쪽지를 불러오는 중입니다...</Box>

  return (
    <Container>
      <MessageNavigator title={storeNickname} messageType={'inchatting'} />
      <Box sx={{ width: '100%' }}>
        {messageData.map((user: IMessageInformation, idx: number) => {
          return <MessageContent key={idx} user={user} />
        })}
        {isPc ? (
          <MessageForm
            type={'existingMessage'}
            nickname={undefined} // TODO: 내 상태
            setMessageData={setMessageData}
            isPc={true}
          />
        ) : (
          // router.push(
          //   `http://localhost:3000/profile/message/view?target=${storeNickname}`,
          // )
          <div>bye</div>
        )}
      </Box>
    </Container>
  )
}

export default Test
