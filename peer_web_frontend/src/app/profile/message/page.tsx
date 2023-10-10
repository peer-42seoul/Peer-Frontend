'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import MessageList from '@/app/profile/message/MessageList'
import { Box, Button, Container, useMediaQuery } from '@mui/material'
import axios from 'axios'
import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import MessageChatPage from './[id]/page'
import CuModal from '@/components/CuModal'
import MessageWritingForm from './write/page'
import useModal from '@/hook/useModal'
import { IMessagObject } from '@/types/IMessageInformation'

const MessageMain = () => {
  const target = useRef(null)
  const MessageBox = useRef<HTMLDivElement | null>(null)
  const [page, setPage] = useState(1)
  const [spinner, setSpinner] = useState(false)
  const [messageList, setMessageList] = useState<IMessagObject[]>([])
  const [selectedStatus, setSelectedStatus] = useState(false)
  const isPc = useMediaQuery('(min-width:481px)')
  const { isOpen, openModal, closeModal } = useModal()

  const { data, error, isLoading } = useSWR(
    `https://27366dd1-6e95-4ec6-90c2-062a85a79dfe.mock.pstmn.io/profile/message`,
    defaultGetFetcher,
  )

  console.log('data', data)
  useEffect(() => {
    if (data) {
      setMessageList((prevMessages) => [...prevMessages, ...data])
      setSpinner(false)
    }
  }, [data])

  const debouncedFetchData = debounce(() => {
    if (!spinner) {
      axios
        .get(`http://localhost:4000/profile_message?page=${page}`) // FIXME 백엔드랑 논의 이후에 무한 스크롤 기능 수정해야함
        .then((res) => {
          setMessageList((prevMessages) => [...prevMessages, ...res.data])
          setSpinner(false)
        })
        .catch((err) => {
          // FIXME : 에러처리 401 해줘야 함
          console.log(err)
          setSpinner(false)
          setPage(1)
          alert('불러오는 것에 실패했습니다.')
          MessageBox?.current?.scrollTo({ top: 0, behavior: 'smooth' })
        })
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
          <MessageWritingForm />
        </CuModal>
      )}
      <Box
        sx={{ display: 'grid', gridTemplateColumns: isPc ? '3fr 7fr' : '1fr' }}
      >
        <Box>
          <Box sx={{ height: '85vh', overflow: 'auto' }} ref={MessageBox}>
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
                openModal()
              }}
            >
              쪽지 보내기
            </Button>
          )}
        </Box>
        {isPc && (
          <MessageChatPage
            messageList={data}
            selectedStatus={selectedStatus}
            isPc={isPc}
            image={messageList}
          />
        )}
      </Box>
    </Container>
  )
}

export default MessageMain
