'use client'

import { useCallback, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { IMessagObject } from '@/types/IMessageInformation'
import CuButton from '@/components/CuButton'
import useToast from '@/hook/useToast'
import MessageList from './MessageList'
import MessageWritingFormModal from './MessageWritingFormModal'

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
  isNewMessageModalOpen: boolean
  newMessageModalClose: () => void
}

const MessageContainer = ({
  messages,
  error,
  isLoading,
  isPC,
  isNewMessageModalOpen,
  newMessageModalClose,
}: IMessageContainerProps) => {
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const [messageData, setMessageData] = useState<IMessagObject[]>([])
  const [isManageMode, setIsManageMode] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (isManageMode) setSelectedUsers(new Set())
  }, [isManageMode])

  useEffect(() => {
    setMessageData(messages)
  }, [messages])

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
    setSelectedUsers(new Set(messageData.map((message) => message.targetId)))
  }

  const handleDelete = () => {
    const requestBody = Array.from(selectedUsers).map((targetId) => ({
      targetId,
    }))
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/message/delete-message`,
        {
          data: {
            target: requestBody,
          },
          headers: { 'Cache-Control': 'no-store' },
        },
      )
      .then((response: AxiosResponse<IMessagObject[]>) => {
        setMessageData(response.data)
        setIsManageMode(false)
      })
      .catch(() => {
        openToast()
      })
  }

  const toggleSelectUser = (targetId: number) => {
    if (selectedUsers.has(targetId)) {
      selectedUsers.delete(targetId)
      setSelectedUsers(selectedUsers)
    } else {
      selectedUsers.add(targetId)
      setSelectedUsers(selectedUsers)
    }
  }

  if (isLoading) return <Typography>데이터를 불러오는 중입니다 @_@</Typography>
  if (error || !messageData)
    return <Typography>데이터 불러오기에 실패했습니다.</Typography>
  if (messageData.length === 0)
    return <Typography>쪽지함이 비었습니다.</Typography>

  return (
    <>
      <Stack spacing={2}>
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
        <MessageList
          messages={messageData}
          isManageMode={isManageMode}
          toggleSelectUser={toggleSelectUser}
        />
        <CuToast open={isOpen} onClose={closeToast} severity="error">
          <Typography>삭제에 실패하였습니다.</Typography>
        </CuToast>
      </Stack>
      {isNewMessageModalOpen && (
        <MessageWritingFormModal
          isOpen={isNewMessageModalOpen}
          handleClose={newMessageModalClose}
        />
      )}
    </>
  )
}

export default MessageContainer
