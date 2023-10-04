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
import axios from 'axios'
import { IMessagObject } from '@/types/IMessageInformation'

interface IMessageList {
  data: IMessagObject[] | []
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
  setSelectedUser,
}: {
  idx: number
  user: IMessagObject
  onManageMessage: boolean
  isPc: boolean | undefined
  setSelectedUser: (newValue: string) => void
}) => {
  const label = { inputProps: { 'aria-label': 'MessageItem Checkbox' } }
  const router = useRouter()

  const userSelector = useCallback(
    (targetUser: number) => {
      console.log('targetUser', targetUser)
      setSelectedUser((prevSelectedUsers) => [
        ...prevSelectedUsers,
        { targetId: targetUser },
      ])
    },
    // console.log('seletedUser', seletedUser),
    [setSelectedUser],
  )

  const messageContentHandler = useCallback(
    (nickname: string, isPc?: boolean) => {
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
          onClick={() => userSelector(user.targetNickname)} //FIXME: targetId로 바꿔야함
          {...label}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
        />
      )}
      <Box
        sx={{ width: '100%', padding: '16px 0 16px 0' }}
        // key={idx}
        onClick={() => messageContentHandler(user.targetNickname, isPc)}
      >
        <Typography>{user.targetNickname}</Typography>
        <Typography>{user.latestDate}</Typography>
        <Typography>{user.latestContent}</Typography>
        <Typography
          style={{
            width: '10%',
            color: 'white',
            background: 'rgba(255, 81, 64, 1)',
            borderRadius: '50%',
            textAlign: 'center',
          }}
        >
          {user.unreadMsgNumber > 0 ? user.unreadMsgNumber : null}
        </Typography>

        <Image
          src={`${user.targetProfile}`}
          alt="picture_of_sender"
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
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
  // const router = useRouter()
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<IMessagObject[]>(data)
  const [onManageMessage, setOnManageMessage] = useState(true)
  // const [seletedUser, setSelectedUser] = useState<string[]>([])
  const [seletedUser, setSelectedUser] = useState<Array<{ targetId: string }>>(
    [],
  )
  const searchMessageItemHandler = useCallback(() => {
    const filteredResults = data.filter((user: IMessagObject) =>
      user.targetNickname.includes(searchText),
    )
    setFilteredData(filteredResults)
  }, [data, searchText])

  const removeMessageItemHandler = useCallback(
    (type: string) => {
      if (type === 'delete') {
        console.log('seletedUser42', seletedUser)
        // const confirmResult = confirm('are you sure?')
        console.log('deleteList', seletedUser)
        axios.delete(`http://localhost:4000/message_list`, {
          data: {
            nickname: seletedUser,
          },
        })
      } else if (type === 'manage') {
        setOnManageMessage(!onManageMessage)
      }
    },
    [onManageMessage, seletedUser],
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
          <Button onClick={searchMessageItemHandler}>
            <SearchIcon />
          </Button>
          {onManageMessage ? (
            <Button onClick={() => removeMessageItemHandler('manage')}>
              관리
            </Button>
          ) : (
            <Button onClick={() => removeMessageItemHandler('delete')}>
              삭제
            </Button>
          )}
        </Box>
        {filteredData.length === 0 ? (
          <Box sx={{ width: '100vw', height: '99vh' }}>
            검색 결과가 없습니다.
          </Box>
        ) : (
          filteredData.map((user: IMessagObject, idx: number) => (
            <MessageItem
              key={user.target}
              idx={idx}
              user={user}
              onManageMessage={onManageMessage}
              isPc={isPc}
              setSelectedUser={setSelectedUser}
            />
          ))
        )}
      </Box>
      {spinner && <CircularProgress />}
    </Stack>
  )
}

export default MessageList
