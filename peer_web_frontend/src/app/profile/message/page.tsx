'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import MessageList from '@/app/profile/message/MessageList'
import { Box, Button, Container, useMediaQuery } from '@mui/material'
import axios from 'axios'
import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import CuModal from '@/components/CuModal'
import MessageWritingForm from './MessageWritingForm'
import useModal from '@/hook/useModal'
import { IMessagObject } from '@/types/IMessageInformation'
import MessageNavigator from '@/components/MessageNavigator'
import useMedia from '@/hook/useMedia'
import useAuthStore from '@/states/useAuthStore'

const MessageMain = () => {
  const MessageBox = useRef<HTMLDivElement | null>(null)
  const [messageList, setMessageList] = useState<IMessagObject[]>([])
  const { isPc } = useMedia()
  const { isOpen, openModal, closeModal } = useModal()
  // const { userId } = useAuthStore()
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/message/list?userId=${1}`, // FIXME : 내 userId 넣기
    defaultGetFetcher,
  )

  console.log('data', data)
  useEffect(() => {
    if (data) {
      setMessageList((prevMessages) => [...prevMessages, ...data])
    }
  }, [data])

  console.log('data의 값은', data)
  return (
    <Container sx={{ height: '90vh' }}>
      {isOpen && (
        <CuModal
          open={isOpen}
          handleClose={closeModal}
          title={'create_message'}
          description={'create_message'}
        >
          <MessageWritingForm handleClose={closeModal} />
        </CuModal>
      )}
      <Box sx={{ display: 'grid', width: '100%' }}>
        <Box>
          {isPc ? (
            <Button
              variant="outlined"
              onClick={() => {
                openModal()
              }}
            >
              쪽지 보내기
            </Button>
          ) : (
            <MessageNavigator
              title="쪽지"
              messageType="main"
              // open={isOpen}
              // handleClose={closeModal}
              openModal={openModal}
            />
          )}
          <Box sx={{ height: '85vh', overflow: 'auto' }} ref={MessageBox}>
            <MessageList
              data={messageList || []}
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
