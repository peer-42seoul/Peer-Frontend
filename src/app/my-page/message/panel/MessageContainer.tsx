'use client'

import { useCallback, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { Button, Stack, TextField, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import { IMessageListData } from '@/types/IMessage'
import CuButton from '@/components/CuButton'
import useSelectCheckBox from '@/hook/useSelectCheckbox'
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
  isSelectAll: boolean
  handleSelectAll: () => void
  handleUnselectAll: () => void
  handleDelete: () => void
}

const ManageBar = ({
  isSelectAll,
  handleSelectAll,
  handleUnselectAll,
  handleDelete,
}: IManageBarProps) => {
  return (
    // 관리 모드 나가기 버튼?
    <Stack direction="row">
      {isSelectAll ? (
        <CuButton
          variant="text"
          action={handleUnselectAll}
          message="전체 선택 해제"
        />
      ) : (
        <CuButton variant="text" action={handleSelectAll} message="전체 선택" />
      )}
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
  // const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set())
  const {
    selectedSet: selectedUsers,
    isSelectedAll,
    selectAll,
    unselectAll,
    toggleSelect,
  } = useSelectCheckBox(new Set<number>())

  const axiosInstance = useAxiosWithAuth()
  const { messageList, setMessageList } = useMessageListState()

  useEffect(() => {
    if (isManageMode) unselectAll()
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

  return (
    <>
      <Stack spacing={2}>
        {isManageMode ? (
          <ManageBar
            isSelectAll={isSelectedAll(messageList)}
            handleSelectAll={() =>
              selectAll(messageList.map((message) => message.targetId))
            }
            handleUnselectAll={() => unselectAll()}
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
          messageList={messageList}
          state={{ isManageMode, isLoading, error }}
          toggleSelectUser={toggleSelect}
        />
        <CuToast open={isOpen} onClose={closeToast} severity="error">
          <Typography>삭제에 실패하였습니다.</Typography>
        </CuToast>
      </Stack>
    </>
  )
}

export default MessageContainer
