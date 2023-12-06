'use client'

import { Button, Stack, TextField, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import useAxiosWithAuth from '@/api/config'
import { IMessageListData, IMessageTarget } from '@/types/IMessage'
import CuModal from '@/components/CuModal'
import NewMessageForm from './NewMessageForm'
import TargetList from './TargetList'

interface INewMessageModalProps {
  isOpen: boolean
  handleClose: () => void
  setMessageData: (newMessageData: IMessageListData[]) => void
}

const NewMessageModal = ({
  isOpen,
  handleClose,
  setMessageData,
}: INewMessageModalProps) => {
  const [keyword, setKeyword] = useState('')
  const [targetUser, setTargetUser] = useState<IMessageTarget | undefined>()
  const [messageTargetList, setMessageTargetList] = useState<IMessageTarget[]>()
  const axiosInstance = useAxiosWithAuth()

  const searchUserWithKeyword = useCallback(async () => {
    if (!keyword) {
      alert('검색어를 입력하세요.')
      return
    }

    try {
      const response = await axiosInstance.post('/api/v1/message/searching', {
        keyword: keyword,
      })
      response.data
        ? setMessageTargetList(response.data)
        : setMessageTargetList([])
    } catch (error) {
      alert('검색에 실패하였습니다. 다시 시도해주세요.')
    }
  }, [keyword])

  return (
    <CuModal
      open={isOpen}
      onClose={handleClose}
      title={'새 쪽지'}
      mobileFullSize
      containedButton={{
        text: '보내기',
        type: 'submit',
        form: 'new-message-form',
      }}
      textButton={{
        text: '취소',
        onClick: handleClose,
      }}
    >
      <Stack alignItems={'center'} spacing={2}>
        <Stack direction={'row'} alignItems={'stretch'} sx={{ width: '100%' }}>
          <TextField
            sx={{ width: '100%' }}
            value={keyword}
            placeholder="닉네임 혹은 이메일을 입력하세요"
            variant="outlined"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button onClick={searchUserWithKeyword}>검색</Button>
        </Stack>
        {messageTargetList && (
          <TargetList
            messageTargetList={messageTargetList}
            setTargetUser={setTargetUser}
          />
        )}
        <NewMessageForm
          userInfo={targetUser}
          handleClose={handleClose}
          setMessageData={setMessageData}
        />
      </Stack>
    </CuModal>
  )
}

export default NewMessageModal
