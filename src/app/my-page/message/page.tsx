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
  // NOTE : useRef가 필요한 이유? - 필요없음이 확인되면 지우기
  // const MessageBox = useRef<HTMLDivElement | null>(null)
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
          setMessageData={setMessageList}
        />
      )}
    </Container>
  )
}

export default MessageMain
