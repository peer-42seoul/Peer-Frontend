'use client'

import {
  Box,
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import MessageNavigator from '../../../components/MessageNavigator'
import CircularProgress from '@mui/material/CircularProgress'
import useMessageStore from '@/states/useMessageStore'
import Image from 'next/image'
import SearchIcon from '@mui/icons-material/Search'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
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

const MessageItem = ({
  user,
  onManageMessage,
  isPc,
}: {
  idx: number
  user: IUserInformation
  onManageMessage: boolean
  isPc: boolean | undefined
}) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const router = useRouter()
  const handleChange = (target) => {
    console.log('target', target)
  }

  const messageContentHandler = useCallback(
    (nickname: string, isPc?: boolean) => {
      console.log('nickname', nickname)
      if (!isPc) {
        // setSelectedStatus(true),
        useMessageStore.setState({ storeNickname: nickname })

        router.push(
          // `http://localhost:3000/profile/message/nickname?search=${nickname}`,
          'http://localhost:3000/profile/message/' + nickname, //FIXME:추후에 수정해야하는 api콜
        )
      } else {
        // setSelectedStatus(true)
        useMessageStore.setState({ storeNickname: nickname })
      }
    },
    [router],
  )

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
      {!onManageMessage && (
        <Checkbox
          onClick={() => handleChange(user.nickname)}
          {...label}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
        />
      )}
      <Box
        sx={{ width: '100%', padding: '16px 0 16px 0' }}
        // key={idx}
        onClick={() => messageContentHandler(user.nickname, isPc)}
      >
        <Typography>{user.nickname}</Typography>
        <Typography>{user.messageTime}</Typography>
        <Typography>{user.lastContent}</Typography>

        <Image
          src={`${user.profileImage}`}
          alt="picture_of_sender"
          width={100}
          height={100}
        />
      </Box>
    </Box>
  )
}

const MessageList = ({
  data,
  error,
  isLoading,
  spinner,
  isPc,
}: IMessageList) => {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<IUserInformation[]>(data)
  const [onManageMessage, setOnManageMessage] = useState(true)

  const searchMessageItemHandler = useCallback(() => {
    const filteredResults = data.filter((user: IUserInformation) =>
      user.nickname.includes(searchText),
    )
    setFilteredData(filteredResults)
  }, [data, searchText])

  const removeMessageItemHandler = useCallback(() => {
    setOnManageMessage(!onManageMessage)
  }, [onManageMessage])

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
          <Button onClick={searchMessageItemHandler}>
            <SearchIcon />
          </Button>
          {onManageMessage ? (
            <Button onClick={removeMessageItemHandler}>관리</Button>
          ) : (
            <Button onClick={removeMessageItemHandler}>삭제</Button>
          )}
        </Box>
        {filteredData.length === 0 ? (
          <Box sx={{ width: '100vw', height: '99vh' }}>
            검색 결과가 없습니다.
          </Box>
        ) : (
          filteredData.map((user: IUserInformation, idx: number) => (
            <MessageItem
              key={user.nickname}
              idx={idx}
              user={user}
              onManageMessage={onManageMessage}
              isPc={isPc}
            />
          ))
        )}
      </Box>
      {spinner && <CircularProgress />}
    </Stack>
  )
}

export default MessageList
