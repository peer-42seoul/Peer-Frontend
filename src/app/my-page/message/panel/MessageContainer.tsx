'use client'

import { useCallback, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { Button, Stack, TextField, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import { IMessageListData } from '@/types/IMessage'
import CuButton from '@/components/CuButton'
import useToast from '@/hook/useToast'
import MessageList from './MessageList'
import useMessageListState from '@/states/useMessageListState'

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
  originalMessageData: IMessageListData[] | undefined
  error: any
  isLoading: boolean
  isPC: boolean
}

const MessageContainer = ({
  originalMessageData,
  error,
  isLoading, // isPC,
}: IMessageContainerProps) => {
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const [isManageMode, setIsManageMode] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set())

  const axiosInstance = useAxiosWithAuth()
  const { messageList, setMessageList } = useMessageListState()

  useEffect(() => {
    if (isManageMode) setSelectedUsers(new Set())
  }, [isManageMode])

  useEffect(() => {
    if (originalMessageData) setMessageList(originalMessageData)
    else setMessageList([])
  }, [originalMessageData])

  // event handler

  const handleMessageSearch = useCallback(() => {
    // NOTE : 검색어가 없는 경우에는 모든 메시지를 보여준다?
    if (!originalMessageData) return
    if (!searchKeyword) setMessageList(originalMessageData)
    else
      setMessageList(
        originalMessageData.filter((message) => {
          return message.targetNickname.includes(searchKeyword)
        }),
      )
  }, [originalMessageData, searchKeyword])

  const handleSelectAll = () => {
    setSelectedUsers(new Set(messageList.map((message) => message.targetId)))
  }

  const handleDelete = () => {
    const requestBody = Array.from(selectedUsers).map((targetId) => ({
      targetId,
    }))
    axiosInstance
      .delete('/api/v1/message/delete-message', {
        data: {
          target: requestBody,
        },
      })
      .then((response: AxiosResponse<IMessageListData[]>) => {
        setMessageList(response.data)
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
  if (error || !messageList)
    return <Typography>데이터 불러오기에 실패했습니다.</Typography>
  if (messageList.length === 0)
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
          messages={messageList}
          isManageMode={isManageMode}
          toggleSelectUser={toggleSelectUser}
        />
        <CuToast open={isOpen} onClose={closeToast} severity="error">
          <Typography>삭제에 실패하였습니다.</Typography>
        </CuToast>
      </Stack>
    </>
  )
}

export default MessageContainer
