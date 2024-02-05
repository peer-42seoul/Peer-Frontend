'use client'

import { useCallback, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import { IMessageListData } from '@/types/IMessage'
import useSelectCheckBox from '@/hook/useSelectCheckbox'
import useMedia from '@/hook/useMedia'
import useToast from '@/states/useToast'
import MessageList from './MessageList'
import useMessageListState from '@/states/useMessageListState'
import { SearchBar, ManageBar, ContainerHeader } from './MessageBar'
import * as style from './MessageContainer.style'

interface IMessageContainerProps {
  originalMessageData: IMessageListData[] | undefined
  error: any
  isLoading: boolean
  openNewMessageModal: () => void
}

const MessageContainer = ({
  originalMessageData,
  error,
  isLoading,
  openNewMessageModal,
}: IMessageContainerProps) => {
  const [isManageMode, setIsManageMode] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const {
    selectedSet: selectedUsers,
    isSelectedAll,
    selectAll,
    unselectAll,
    toggleSelect,
  } = useSelectCheckBox(new Set<number>())

  const axiosInstance = useAxiosWithAuth()
  const { messageList, setMessageList } = useMessageListState()
  const { isPc } = useMedia()
  const { openToast } = useToast()

  useEffect(() => {
    if (isManageMode) unselectAll()
  }, [isManageMode])

  useEffect(() => {
    if (originalMessageData) setMessageList(originalMessageData)
    else setMessageList([])
  }, [originalMessageData])

  // event handler

  const handleMessageSearch = useCallback(() => {
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
    const requestBody = Array.from(selectedUsers).map((conversationId) => ({
      conversationId,
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
        openToast({
          severity: 'error',
          message: '삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
        })
      })
  }

  return (
    <>
      <Stack spacing={'1.5rem'} sx={style.pcContainer}>
        <ContainerHeader
          isPc={isPc}
          isManageMode={isManageMode}
          setIsManageMode={setIsManageMode}
          openNewMessageModal={openNewMessageModal}
        />
        {isManageMode ? (
          <ManageBar
            isSelectedAll={isSelectedAll(messageList)}
            handleSelectAll={() =>
              selectAll(messageList.map((message) => message.targetId))
            }
            handleUnselectAll={unselectAll}
            handleDelete={handleDelete}
          />
        ) : (
          <SearchBar
            isPc={isPc}
            setSearchKeyword={setSearchKeyword}
            handleMessageSearch={handleMessageSearch}
          />
        )}
        <MessageList
          messageList={messageList}
          state={{ isManageMode, isLoading, error }}
          selectedUsers={selectedUsers}
          toggleSelectUser={toggleSelect}
        />
      </Stack>
    </>
  )
}

export default MessageContainer
