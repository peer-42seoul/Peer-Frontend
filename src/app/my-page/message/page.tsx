'use client'

import { AxiosInstance } from 'axios'
import useAxiosWithAuth from '@/api/config'
import { defaultGetFetcher, getFetcherWithInstance } from '@/api/fetchers'
import { Box, Button, Container } from '@mui/material'
import { useRef } from 'react'
import useSWR from 'swr'
import CuModal from '@/components/CuModal'
import MessageWritingForm from './MessageWritingForm'
import useModal from '@/hook/useModal'
import { IMessagObject } from '@/types/IMessageInformation'
import useMedia from '@/hook/useMedia'
import MessageList from './MessageList'

// import useAuthStore from '@/states/useAuthStore'

const MessageMain = () => {
  const MessageBox = useRef<HTMLDivElement | null>(null)
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
      {isOpen && (
        <CuModal
          open={isOpen}
          handleClose={closeModal}
          ariaTitle={'create_message'}
          ariaDescription={'create_message'}
        >
          <MessageWritingForm handleClose={closeModal} />
        </CuModal>
      )}
      <Box sx={{ display: 'grid', width: '100%' }}>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              openModal()
            }}
          >
            쪽지 보내기
          </Button>
          <Box sx={{ height: '85vh', overflow: 'auto' }} ref={MessageBox}>
            <MessageList
              data={data || []}
              error={error}
              isLoading={isLoading}
              isPc={isPc}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default MessageMain
