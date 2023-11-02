'use client'

import { AxiosInstance } from 'axios'
import useAxiosWithAuth from '@/api/config'
import { defaultGetFetcher, getFetcherWithInstance } from '@/api/fetchers'
import { Box, Container } from '@mui/material'
// import { useRef } from 'react'
import useSWR from 'swr'
import CuModal from '@/components/CuModal'
import MessageWritingForm from './panel/MessageWritingFormModal'
import useModal from '@/hook/useModal'
import { IMessagObject } from '@/types/IMessageInformation'
import useMedia from '@/hook/useMedia'
// import MessageList from './MessageList'
import CuButton from '@/components/CuButton'
import MessageContainer from './panel/MessageContainer'

// import useAuthStore from '@/states/useAuthStore'

const MessageMain = () => {
  // NOTE : useRef가 필요한 이유? - 필요없음이 확인되면 지우기
  // const MessageBox = useRef<HTMLDivElement | null>(null)
  const { isPc } = useMedia()
  const { isOpen, openModal, closeModal } = useModal()
  // const axiosInstance = useAxiosWithAuth()
  // const { data, error, isLoading } = useSWR<IMessagObject[]>(
  //   [`${process.env.NEXT_PUBLIC_API_URL}/api/v1/message/list`, axiosInstance],
  //   ([url, axiosInstance]) =>
  //     getFetcherWithInstance(url, axiosInstance as AxiosInstance),
  // )
  // TODO : PR 전 반드시 지울 것 - mock data 확인용 mock api
  const { data, error, isLoading } = useSWR<IMessagObject[]>(
    '/api/v1/message/list',
    defaultGetFetcher,
  )

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
          messages={data || []}
          error={error}
          isLoading={isLoading}
          isPC={isPc}
          isNewMessageModalOpen={isOpen}
          newMessageModalClose={closeModal}
        />
        {/* </Box> */}
      </Box>
    </Container>
  )
}

export default MessageMain
