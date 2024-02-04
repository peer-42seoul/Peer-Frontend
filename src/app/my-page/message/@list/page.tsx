'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import { Stack } from '@mui/material'
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

const NewMessageButton = ({ openModal }: { openModal: () => void }) => {
  return (
    <Stack direction="row" justifyContent={'flex-end'}>
      <CuButton
        message="새 쪽지"
        action={openModal}
        variant={'contained'}
        startIcon={<PlusIcon width={'1.25rem'} height={'1.25rem'} />}
        style={style.pcSendButton}
      />
    </Stack>
  )
}

const MessageListPage = () => {
  const { isPc } = useMedia()
  const { isOpen, openModal, closeModal } = useModal()
  const axiosWithAuth = useAxiosWithAuth()
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
      <Stack spacing={'2rem'}>
        {isPc && <NewMessageButton openModal={openModal} />}
        <BackgroundBox mobileSx={style.mobileBox} pcSx={style.pcBox}>
          <MessageContainer
            originalMessageData={data}
            error={error}
            isLoading={isLoading}
            openNewMessageModal={openModal}
          />
        </BackgroundBox>
      </Stack>
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
