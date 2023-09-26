'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import MessageList from '@/app/profile/message/MessageList'
import { Box, Button, Container, useMediaQuery } from '@mui/material'
import axios from 'axios'
import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import MessageChatPage from './[id]/page'
import ModalContainer from '@/components/ModalContainer'
import MessageWritingForm from './write/page'
import useModal from '@/hooks/useModal'
import { IMessagObject } from '@/types/IMessageInformation'

// interface IMessagObject {
//   // nickname: string
//   // profileImage: string
//   // messageTime: string
//   // lastContent: string
//   target: number
//   targetNickname: string
//   unreadMsgNumber: number
//   latestContent: string
//   latestDate: string
// }

const MessageMain = () => {
  const target = useRef(null)
  const [page, setPage] = useState(1)
  const [spinner, setSpinner] = useState(false)
  const [messageList, setMessageList] = useState<IMessagObject[]>([])
  const [selectedStatus, setSelectedStatus] = useState(false)
  const isPc = useMediaQuery('(min-width:481px)')
  const { open, handleClose, handleOpen } = useModal()

  const { data, error, isLoading } = useSWR(
    `http://localhost:4000/profile_message`, //FIXME: _바를 /로 체인지
    defaultGetFetcher,
  )

  useEffect(() => {
    if (data) {
      setMessageList((prevMessages) => [...prevMessages, ...data])
      setSpinner(false)
    }
  }, [data])

  const debouncedFetchData = debounce(() => {
    if (!spinner) {
      axios
        .get(`http://localhost:4000/profile_message?page=${page}`)
        .then((res) => {
          setMessageList((prevMessages) => [...prevMessages, ...res.data])
          setSpinner(false)
        })
        .catch((err) => console.log(err))
    }
  }, 1000)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!spinner) {
            setSpinner(true)
            setPage((prev: number) => prev + 1)
            debouncedFetchData()
          }
        }
      },
      { threshold: 0.7 },
    )
    const currentTarget = target.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }
    return () => {
      if (currentTarget) observer.unobserve(currentTarget)
    }
  }, [target, !spinner])

  return (
    <Container sx={{ height: '90vh' }}>
      {open && (
        <ModalContainer
          open={open}
          handleClose={handleClose}
          title={'create_message'}
          description={'create_message'}
        >
          <MessageWritingForm isPc={isPc} handleClose={handleClose} />
        </ModalContainer>
      )}
      <Box
        sx={{ display: 'grid', gridTemplateColumns: isPc ? '3fr 7fr' : '1fr' }}
      >
        <Box>
          <Box sx={{ height: '85vh', overflow: 'auto' }}>
            <MessageList
              data={messageList || []}
              error={error}
              isLoading={isLoading}
              spinner={spinner}
              setSelectedStatus={setSelectedStatus}
              isPc={isPc}
            />
            <Box
              sx={{
                bottom: 0,
                height: '1vh',
                backgroundColor: 'primary.main',
              }}
              ref={target}
            ></Box>
          </Box>
          {isPc && (
            <Button
              variant="outlined"
              onClick={() => {
                handleOpen()
              }}
            >
              쪽지 보내기
            </Button>
          )}
        </Box>
        {isPc && (
          <MessageChatPage selectedStatus={selectedStatus} isPc={isPc} />
        )}
      </Box>
    </Container>
  )
}

export default MessageMain
