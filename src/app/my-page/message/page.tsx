'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import { Box, Container, Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import useModal from '@/hook/useModal'
import useMessageListState from '@/states/useMessageListState'
import { IMessageListData } from '@/types/IMessage'
import MessageContainer from './panel/MessageContainer'
import NewMessageModal from './panel/NewMessageModal'

interface INewMessageButtonProps {
  isPc: boolean
  openModal: () => void
}

const NewMessageButton = ({ isPc, openModal }: INewMessageButtonProps) => {
  return (
    <Stack direction="row" justifyContent={'flex-end'}>
      {isPc ? (
        <CuButton
          variant="outlined"
          action={openModal}
          message="새 쪽지 보내기"
          style={{ marginBottom: '32px' }}
        />
      ) : (
        <CuButton
          variant="text"
          action={openModal}
          message="+"
          style={{ marginBottom: '32px' }}
        />
      )}
    </Stack>
  )
}

const MessageMain = () => {
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
    <Container sx={{ height: '90vh' }}>
      <Box sx={{ width: '100%' }}>
        <NewMessageButton isPc={isPc} openModal={openModal} />
        <MessageContainer
          originalMessageData={data}
          error={error}
          isLoading={isLoading}
          isPC={isPc}
        />
      </Box>
      {isOpen && (
        <NewMessageModal
          isOpen={isOpen}
          handleClose={closeModal}
          setMessageData={setMessageList}
        />
      )}
    </Container>
  )
}

export default MessageMain
