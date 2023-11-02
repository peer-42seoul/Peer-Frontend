'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { IMessagObject } from '@/types/IMessageInformation'
import CuButton from '@/components/CuButton'

interface ISearchBarProps {
  setSearchKeyword: (keyword: string) => void
  setIsManageMode: (isManageMode: boolean) => void
  handleMessageSearch: () => void
}

const SearchBar = ({
  setSearchKeyword,
  setIsManageMode,
  handleMessageSearch,
}: ISearchBarProps) => {
  return (
    <Stack direction="row">
      <TextField
        placeholder="사람을 검색해 주세요."
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <Button variant="contained" onClick={handleMessageSearch}>
        검색
      </Button>
      <CuButton
        variant="text"
        action={() => setIsManageMode(true)}
        message="관리"
      />
    </Stack>
  )
}

interface IManageBarProps {
  handleSelectAll: () => void
  handleDelete: () => void
}

const ManageBar = ({ handleSelectAll, handleDelete }: IManageBarProps) => {
  return (
    // 관리 모드 나가기 버튼?
    <Stack direction="row">
      <CuButton variant="text" action={handleSelectAll} message="전체 선택" />
      <CuButton variant="text" action={handleDelete} message="삭제" />
    </Stack>
  )
}

interface IMessageContainerProps {
  messages: IMessagObject[]
  error: any
  isLoading: boolean
  isPC: boolean
}

const MessageContainer = ({
  messages,
  error,
  isLoading,
  isPC,
}: IMessageContainerProps) => {
  const [messageData, setMessageData] = useState<IMessagObject[]>(messages)
  const [isManageMode, setIsManageMode] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedUser, setSelectedUser] = useState<{ targetId: number }[]>([])

  useEffect(() => {
    if (isManageMode) setSelectedUser([])
  }, [isManageMode])

  // event handler

  const handleMessageSearch = useCallback(() => {
    // NOTE : 검색어가 없는 경우에는 모든 메시지를 보여준다?
    if (!searchKeyword) setMessageData(messages)
    else
      setMessageData(
        messages.filter((message) => {
          return message.targetNickname.includes(searchKeyword)
        }),
      )
  }, [messages, searchKeyword])

  const handleSelectAll = () => {
    setSelectedUser(
      Array.from(messageData, (message) => {
        return { targetId: message.targetId }
      }),
    )
    console.log('select all message')
  }

  const handleDelete = () => {
    // TODO : delete message
    console.log('delete message')
  }

  return (
    <Stack>
      {isManageMode ? (
        <ManageBar
          handleSelectAll={handleSelectAll}
          handleDelete={handleDelete}
        />
      ) : (
        <SearchBar
          setSearchKeyword={setSearchKeyword}
          setIsManageMode={setIsManageMode}
          handleMessageSearch={handleMessageSearch}
        />
      )}
    </Stack>
  )
}

export default MessageContainer
