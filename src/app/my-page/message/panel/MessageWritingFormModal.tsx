'use client'

import { Button, Stack, TextField, Typography, Avatar } from '@mui/material'
import React, { useCallback, useState } from 'react'
import useAxiosWithAuth from '@/api/config'
import { IMessageListData } from '@/types/IMessage'
import CuModal from '@/components/CuModal'

interface IProps {
  userInfo?: ILetterTarget
  setMessageData: (newMessageData: IMessageListData[]) => void
  handleClose?: any | undefined
}

interface IMessageData {
  targetId: number
  content: string
}

export interface ILetterTarget {
  targetId: number
  targetEmail: string
  targetNickname: string
  targetProfile: string
}

interface ITargetItemProps {
  letterTarget: ILetterTarget
  setTargetUser: (targetUser: ILetterTarget) => void
}

function TargetItem({ letterTarget, setTargetUser }: ITargetItemProps) {
  const { targetEmail, targetNickname, targetProfile } = letterTarget

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={1}
      sx={{ cursor: 'pointer' }}
      onClick={() => {
        setTargetUser(letterTarget)
      }}
    >
      <Avatar src={targetProfile} />
      <Typography>{`${targetNickname} (${targetEmail})`}</Typography>
    </Stack>
  )
}

interface ITargetListProps {
  letterTargetList: ILetterTarget[]
  setTargetUser: (targetUser: ILetterTarget) => void
}

const TargetList = ({ letterTargetList, setTargetUser }: ITargetListProps) => {
  return (
    <Stack>
      {letterTargetList.length === 0 ? (
        <Typography>검색 결과가 없습니다.</Typography>
      ) : (
        letterTargetList.map((target: ILetterTarget) => (
          <TargetItem
            key={target.targetId}
            letterTarget={target}
            setTargetUser={setTargetUser}
          />
        ))
      )}
    </Stack>
  )
}

const MessageForm = ({ userInfo, setMessageData, handleClose }: IProps) => {
  const [content, setContent] = useState('')
  const axiosInstance = useAxiosWithAuth()
  const messageSubmitHandler = useCallback(async () => {
    try {
      if (!content) {
        alert('내용을 입력하세요.')
        return
      } else if (!userInfo) {
        alert('받는 사람을 입력하세요.')
        return
      }
      const reqBody: IMessageData = {
        targetId: userInfo.targetId,
        content: content,
      }
      const response = await axiosInstance.post(
        '/api/v1/message/new-message',
        reqBody,
      )
      setContent('')
      setMessageData(response.data)
      handleClose()
    } catch (error) {
      alert('쪽지 전송에 실패하였습니다. 다시 시도해주세요.')
    }
  }, [content, userInfo])

  return (
    <>
      <Typography>{`받는 사람 : ${
        userInfo ? userInfo.targetNickname : ''
      }`}</Typography>
      <TextField
        sx={{ width: '100%' }}
        value={content}
        placeholder="내용을 입력하세요"
        variant="outlined"
        multiline
        rows={3}
        onChange={(e) => setContent(e.target.value)}
      />
      <Stack direction={'row'} justifyContent={'space-around'} spacing={3}>
        <Button variant="contained" onClick={() => handleClose()}>
          취소
        </Button>
        <Button variant="contained" onClick={messageSubmitHandler}>
          보내기
        </Button>
      </Stack>
    </>
  )
}

interface IMessageWritingFormModalProps {
  isOpen: boolean
  handleClose: () => void
  setMessageData: (newMessageData: IMessageListData[]) => void
}

const MessageWritingFormModal = ({
  isOpen,
  handleClose,
  setMessageData,
}: IMessageWritingFormModalProps) => {
  const [keyword, setKeyword] = useState('')
  const [targetUser, setTargetUser] = useState<ILetterTarget | undefined>()
  const [letterTargetList, setLetterTargetList] = useState<ILetterTarget[]>()
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
        ? setLetterTargetList(response.data)
        : setLetterTargetList([])
    } catch (error) {
      alert('검색에 실패하였습니다. 다시 시도해주세요.')
    }
  }, [keyword])

  return (
    <CuModal
      open={isOpen}
      handleClose={handleClose}
      ariaTitle={'create_message'}
      ariaDescription={'create_message'}
    >
      <Stack alignItems={'center'} spacing={2}>
        <Typography>새 쪽지</Typography>
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
        {letterTargetList && (
          <TargetList
            letterTargetList={letterTargetList}
            setTargetUser={setTargetUser}
          />
        )}
        <MessageForm
          userInfo={targetUser}
          handleClose={handleClose}
          setMessageData={setMessageData}
        />
      </Stack>
    </CuModal>
  )
}

export default MessageWritingFormModal
