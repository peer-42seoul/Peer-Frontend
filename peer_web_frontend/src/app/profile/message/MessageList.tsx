'use client'

import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import MessageNavigator from '../../../components/MessageNavigator'
import CircularProgress from '@mui/material/CircularProgress'
import useMessageStore from '@/states/useMessageStore'
import Image from 'next/image'
import SearchIcon from '@mui/icons-material/Search'
interface IUserInformation {
  nickname: string
  profileImage: string
  messageTime: string
  lastContent: string
}

interface IMessageList {
  data: IUserInformation[] | []
  error: Error | undefined
  isLoading: boolean
  spinner: boolean
  setSelectedStatus: (newValue: boolean) => void
  isPc: boolean
}

const MessageItem = ({ user }: { user: IUserInformation }) => {
  return (
    <>
      <Typography>{user.nickname}</Typography>
      <Typography>{user.messageTime}</Typography>
      <Typography>{user.lastContent}</Typography>

      <Image
        src={`${user.profileImage}`}
        alt="picture_of_sender"
        width={100}
        height={100}
      />
    </>
  )
}

const MessageList = ({
  data,
  error,
  isLoading,
  spinner,
  setSelectedStatus,
  isPc,
}: IMessageList) => {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<IUserInformation[]>(data)

  const searchHandler = useCallback(() => {
    const filteredResults = data.filter((user: IUserInformation) =>
      user.nickname.includes(searchText),
    )
    setFilteredData(filteredResults)
  }, [data, searchText])

  const messageContentHandler = useCallback(
    (nickname: string) => {
      if (!isPc) {
        setSelectedStatus(true),
          useMessageStore.setState({ storeNickname: nickname })

        router.push(
          // `http://localhost:3000/profile/message/nickname?search=${nickname}`,
          'http://localhost:3000/profile/message/' + nickname, //FIXME:추후에 수정해야하는 api콜
        )
      } else {
        setSelectedStatus(true)
        useMessageStore.setState({ storeNickname: nickname })
      }
    },
    [router, isPc],
  )

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  if (error) return <Box>데이터 불러오기를 실패하였습니다.</Box>
  if (!data) return <Box>쪽지함이 비었습니다.</Box>
  if (isLoading)
    return (
      <Box sx={{ width: '100vw', height: '99vh' }}>
        데이터를 불러오는 중입니다...
      </Box>
    )

  return (
    <Stack>
      {!isPc && <MessageNavigator title={'쪽지'} messageType={'쪽지'} />}
      <Box>
        <Box sx={{ display: 'flex' }}>
          <TextField
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="닉네임을 입력하세요"
          />
          <Button onClick={searchHandler}>
            <SearchIcon />
          </Button>
        </Box>
        {filteredData.length === 0 ? (
          <Box sx={{ width: '100vw', height: '99vh' }}>
            검색 결과가 없습니다.
          </Box>
        ) : (
          filteredData.map((user: IUserInformation, idx: number) => (
            <Box
              sx={{ padding: '16px 0 16px 0' }}
              key={idx}
              onClick={() => messageContentHandler(data[idx].nickname)}
            >
              <MessageItem user={user} />
            </Box>
          ))
        )}
      </Box>
      {spinner && <CircularProgress />}
    </Stack>
  )
}

export default MessageList
