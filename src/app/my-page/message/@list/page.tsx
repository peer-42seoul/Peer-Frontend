'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import { IconButton, Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import useModal from '@/hook/useModal'
import useMessageListState from '@/states/useMessageListState'
import { IMessageListData } from '@/types/IMessage'
import MessageContainer from './panel/MessageContainer'
import NewMessageModal from './panel/NewMessageModal'
import BackgroundBox from '@/components/BackgroundBox'
import PlusIcon from '@/icons/PlusIcon'
import * as style from './page.style'

interface INewMessageButtonProps {
  isPc: boolean
  openModal: () => void
}

const NewMessageButton = ({ isPc, openModal }: INewMessageButtonProps) => {
  return (
    <Stack direction="row" justifyContent={'flex-end'}>
      {isPc ? (
        <CuButton
          message="새 쪽지"
          action={openModal}
          variant={'contained'}
          startIcon={<PlusIcon width={'1.25rem'} height={'1.25rem'} />}
          style={style.pcSendButton}
        />
      ) : (
        <IconButton onClick={openModal}>
          <PlusIcon />
        </IconButton>
      )}
    </Stack>
  )
}

const MessageListPage = () => {
  const { isPc } = useMedia()
  const { isOpen, openModal, closeModal } = useModal()
  const axiosWithAuth = useAxiosWithAuth()
  // NOTE : SWR를 사용하고 있는데 굳이 messageListState를 사용해야 하는 이유?...??
  const { data, error, isLoading } = useSWR<IMessageListData[]>(
    '/api/v1/message/list',
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )
  const { setMessageList, resetMessageList } = useMessageListState()

  useEffect(() => {
    return () => {
      resetMessageList()
    }
  }, [])

  return (
    <>
      <Stack spacing={'2rem'} sx={isPc ? style.pcStack : style.mobileStack}>
        <NewMessageButton isPc={isPc} openModal={openModal} />
        <BackgroundBox mobileSx={style.mobileBox} pcSx={style.pcBox}>
          <MessageContainer
            originalMessageData={data}
            error={error}
            isLoading={isLoading}
            isPC={isPc}
          />
        </BackgroundBox>
      </Stack>
      )
      {isOpen && (
        <NewMessageModal
          isOpen={isOpen}
          handleClose={closeModal}
          setMessageData={setMessageList}
        />
      )}
    </>
  )
}

export default MessageListPage
