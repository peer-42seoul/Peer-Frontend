'use client'

import React, { useCallback, useRef, useState, ReactNode } from 'react'
import { IconButton, InputBase, Popper, Stack, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import CuModal from '@/components/CuModal'
import { SearchIcon, CloseIcon } from '@/icons'
import { IMessageListData, IMessageTarget } from '@/types/IMessage'
import NewMessageForm from './NewMessageForm'
import TargetList from './TargetList'
import * as style from './NewMessageModal.style'
import useToast from '@/states/useToast'
import { isAxiosError } from 'axios'
import useMedia from '@/hook/useMedia'

interface INewMessageModalProps {
  isOpen: boolean
  handleClose: () => void
  setMessageData: (newMessageData: IMessageListData[]) => void
}

const InputContainer = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <Stack spacing={'0.25rem'} width={'100%'}>
      <Typography
        sx={style.subTitle}
        variant={'CaptionEmphasis'}
        color={'text.strong'}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  )
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
  const { isPc } = useMedia()
  const { openToast } = useToast()

  const searchUserWithKeyword = useCallback(async () => {
    if (!keyword) {
      openToast({
        severity: 'error',
        message: '검색어를 입력해주세요.',
      })
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
      if (
        isAxiosError(error) &&
        error.response?.status === 400 &&
        error.response?.data?.messages
      ) {
        openToast({
          severity: 'error',
          message: error.response.data.messages[0],
        })
      } else {
        openToast({
          severity: 'error',
          message: '검색 중 오류가 발생했습니다. 다시 시도해주세요.',
        })
      }
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
      <>
        <Stack
          alignItems={isPc ? 'center' : 'flex-start'}
          spacing={'1rem'}
          sx={isPc ? style.pcContainer : style.mobileContainer}
        >
          <InputContainer title={'받는 이'}>
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
              sx={isPc ? style.pcPopper : style.mobilePopper}
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
          </InputContainer>
          <InputContainer title={'내용'}>
            <NewMessageForm
              userInfo={targetUser}
              handleClose={handleClose}
              setMessageData={setMessageData}
            />
          </InputContainer>
        </Stack>
      </>
    </CuModal>
  )
}

export default NewMessageModal
