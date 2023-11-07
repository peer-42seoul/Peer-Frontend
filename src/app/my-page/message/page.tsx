'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import { Box, Container } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import useModal from '@/hook/useModal'
import useMessageDataState from '@/states/useMessageDataState'
import { IMessagObject } from '@/types/IMessageInformation'
import MessageContainer from './panel/MessageContainer'
import MessageWritingFormModal from './panel/MessageWritingFormModal'
import axios from 'axios'

const MessageMain = () => {
  // NOTE : useRef가 필요한 이유? - 필요없음이 확인되면 지우기
  // const MessageBox = useRef<HTMLDivElement | null>(null)
  const { isPc } = useMedia()
  const { isOpen, openModal, closeModal } = useModal()
  const axiosWithAuth = useAxiosWithAuth()
  const { data, error, isLoading } = useSWR<IMessagObject[]>(
    '/api/v1/message/list',
    (url: string) => axios.get(url).then((res) => res.data),
  )
  const { setMessages, resetMessages } = useMessageDataState()

  useEffect(() => {
    return () => {
      resetMessages()
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
        {/* <Box sx={{ height: '85vh', overflow: 'auto' }} ref={MessageBox}> */}
        <MessageContainer
          originalMessageData={data}
          error={error}
          isLoading={isLoading}
          isPC={isPc}
        />
        {/* </Box> */}
      </Box>
      {isOpen && (
        <MessageWritingFormModal
          isOpen={isOpen}
          handleClose={closeModal}
          setMessageData={setMessages}
        />
      )}
    </Container>
  )
}

export default MessageMain
