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
import useMessageStore from '@/states/useMessageStore'
import Image from 'next/image'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { IMessagObject } from '@/types/IMessageInformation'
// import useAuthStore from '@/states/useAuthStore'
import useToast from '@/hook/useToast'

interface IMessageList {
  data: IMessagObject[] | []
  error: Error | undefined
  isLoading: boolean
  isPc: boolean
}

const MessageItem = ({
  user,
  onManageMessage,
  setSelectedUser,
}: {
  user: IMessagObject
  onManageMessage: boolean
  setSelectedUser: (newValue: Array<{ targetId: string }>) => void
}) => {
  const label = { inputProps: { 'aria-label': 'MessageItem Checkbox' } }
  const router = useRouter()
  // const { setStoredTargetProfile } = useMessageStore()

  const userSelector = useCallback(
    (targetUser: number) => {
      console.log('삭제 타게팅된 유저', targetUser)

      // setSelectedUser((prevSelectedUsers: Array<{ targetId: string }>) => [
      //   ...prevSelectedUsers,
      //   { targetId: String(targetUser) }, //FIXME: targetId로 바꿔야함
      // ])
    },
    [setSelectedUser],
  )

  const messageContentHandler = useCallback(
    (user: any) => {
      useMessageStore.setState({
        storedTargetId: user.targetId,
        setStoredConversationalId: user.conversationalId,
      })

      router.push(
        `http://localhost:3000/my-page/message/conversation-list?target=${user.targetId}`,
      )
    },
    [router],
  )
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
      {!onManageMessage && (
        <Checkbox
          onClick={() => userSelector(user.targetId)} //FIXME: targetId로 바꿔야함
          {...label}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
        />
      )}
      <Box
        sx={{ width: '100%', padding: '16px 0 16px 0' }}
        // key={idx}
        onClick={() => messageContentHandler(user)}
      >
        <Typography>{user.targetNickname}</Typography>
        <Typography>{user.latestDate}</Typography>
        <Typography>{user.latestContent}</Typography>
        <Typography
          style={{
            width: '24px',
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
          alt="picture_of_target"
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
        />
      </Box>
    </Box>
  )
}

const MessageList = ({ data, error, isLoading }: IMessageList) => {
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<IMessagObject[]>(data)
  const [onManageMessage, setOnManageMessage] = useState(true)
  // const [seletedUser, setSelectedUser] = useState<Array<{ targetId: string }>>(
  //   [],
  // )
  const [selectedUser, setSelectedUser] = useState<Array<{ targetId: string }>>(
    [],
  )

  const { CuToast, isOpen, openToast, closeToast } = useToast()
  // const { userId } = useAuthStore()
  const userId = 1
  const searchMessageItemHandler = useCallback(() => {
    const filteredResults = data.filter((user: IMessagObject) =>
      user.targetNickname.includes(searchText),
    )
    setFilteredData(filteredResults)
  }, [data, searchText])

  const removeMessageItemHandler = useCallback(
    (type: string) => {
      if (type === 'delete') {
        console.log('seletedUser42', selectedUser)
        // const confirmResult = confirm('are you sure?')
        console.log('deleteList', selectedUser)
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_API_URL}api/v1/message/delete-message?userId=${userId}`,
            {
              data: {
                target: selectedUser,
              },
            },
          )
          .then((response: AxiosResponse<IMessagObject[]>) => {
            setFilteredData(response.data) //FIXME: 받아오는 데이터 값 확인하고 filterdData에 넣고 새로 렌더링 하는 것 확인하기
          })
          .catch((error: AxiosError) => {
            console.error(error)
            openToast() // TODO: 401에러 처리하기
          })
      } else if (type === 'manage') {
        setOnManageMessage(!onManageMessage)
      }
    },
    [onManageMessage, selectedUser],
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
  console.log('메시지 리스트의 user', filteredData)
  return (
    <Stack
      sx={{
        borderRadius: '1rem',
        border: '1px solid #000',
        background: '#FFF',
        padding: '1.5rem',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <TextField
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="사람을 검색하여 주세요"
          />
          <Button onClick={searchMessageItemHandler}>검색</Button>
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
          <Box sx={{ width: '100vw', height: '100vh' }}>
            검색 결과가 없습니다.
          </Box>
        ) : (
          filteredData.map((user: IMessagObject) => (
            <MessageItem
              key={user.targetId}
              user={user}
              onManageMessage={onManageMessage}
              setSelectedUser={setSelectedUser}
            />
          ))
        )}
      </Box>
      <CuToast open={isOpen} onClose={closeToast} severity="error">
        <Typography>삭제에 실패하였습니다.</Typography>
      </CuToast>
    </Stack>
  )
}

export default MessageList
