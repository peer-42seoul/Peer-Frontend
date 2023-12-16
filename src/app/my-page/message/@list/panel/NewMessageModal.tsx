'use client'

import { IconButton, InputBase, Popper, Stack, Typography } from '@mui/material'
import React, { useCallback, useRef, useState } from 'react'
import useAxiosWithAuth from '@/api/config'
import { IMessageListData, IMessageTarget } from '@/types/IMessage'
import CuModal from '@/components/CuModal'
import NewMessageForm from './NewMessageForm'
import TargetList from './TargetList'
import { SearchIcon, CloseIcon } from '@/icons'
import CuButton from '@/components/CuButton'
import * as style from './NewMessageModal.style'

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
  const ref = useRef<HTMLDivElement>(null)

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

  const modalButtonAction = useCallback(() => {
    if (targetUser) {
      setTargetUser(undefined)
      setKeyword('')
    } else {
      searchUserWithKeyword()
    }
    setMessageTargetList(undefined)
  }, [targetUser, searchUserWithKeyword])

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
      <Stack alignItems={'center'} spacing={'1rem'} width={'31rem'}>
        <Stack spacing={'0.25rem'} width={'100%'}>
          <Typography variant={'CaptionEmphasis'} color={'text.strong'}>
            받는 이
          </Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={'0.38rem'}
            sx={style.searchInput}
            ref={ref}
          >
            <SearchIcon sx={style.searchIcon} />
            <InputBase
              fullWidth
              value={targetUser ? targetUser.targetNickname : keyword}
              disabled={!!targetUser}
              placeholder={'닉네임 혹은 이메일을 입력하세요.'}
              sx={style.inputBase}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <CuButton
              message={targetUser ? '취소' : '검색'}
              variant={'text'}
              action={modalButtonAction}
              TypographyProps={{
                variant: 'CaptionEmphasis',
                color: targetUser ? 'purple.strong' : 'text.normal',
              }}
            />
          </Stack>
          <Popper
            sx={style.targetListPopper}
            open={!!messageTargetList}
            anchorEl={ref.current}
          >
            {messageTargetList ? (
              <Stack alignItems={'flex-end'}>
                <IconButton onClick={() => setMessageTargetList(undefined)}>
                  <CloseIcon sx={style.closeIcon} />
                </IconButton>
              </Stack>
            ) : null}
            <TargetList
              messageTargetState={{
                targetList: messageTargetList,
                resetList: () => setMessageTargetList(undefined),
              }}
              setTargetUser={setTargetUser}
            />
          </Popper>
        </Stack>
        <Stack spacing={'0.25rem'} width={'100%'}>
          <Typography variant={'CaptionEmphasis'} color={'text.strong'}>
            내용
          </Typography>
          <NewMessageForm
            userInfo={targetUser}
            handleClose={handleClose}
            setMessageData={setMessageData}
          />
        </Stack>
      </Stack>
    </CuModal>
  )
}

export default NewMessageModal
