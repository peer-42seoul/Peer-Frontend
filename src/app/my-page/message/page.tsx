'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import { Box, Container } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import useModal from '@/hook/useModal'
import useMessageListState from '@/states/useMessageListState'
import { IMessageListData } from '@/types/IMessage'
import MessageContainer from './panel/MessageContainer'
import MessageWritingFormModal from './panel/NewMessageModal'

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
        <CuButton
          variant="outlined"
          action={() => openModal()}
          message="새 쪽지 보내기"
          style={{ marginBottom: '32px' }}
        />
        <MessageContainer
          originalMessageData={data}
          error={error}
          isLoading={isLoading}
          isPC={isPc}
        />
      </Box>
      {isOpen && (
        <MessageWritingFormModal
          isOpen={isOpen}
          handleClose={closeModal}
          setMessageData={setMessageList}
        />
      )}
    </Container>
  )
}

export default MessageMain
