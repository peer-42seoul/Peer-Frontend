'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import MessageList from '@/app/profile/message/MessageList'
import { Box, Container, useMediaQuery } from '@mui/material'
import axios from 'axios'
import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import MessageChatPage from './[id]/page'

interface IUserInformation {
  nickname: string
  profileImage: string
  messageTime: string
  lastContent: string
}

const MessageMain = () => {
  const target = useRef(null)
  const [page, setPage] = useState(1)
  const [spinner, setSpinner] = useState(false)
  const [messageList, setMessageList] = useState<IUserInformation[]>([])
  const [selectedStatus, setSelectedStatus] = useState(false)
  const isPc = useMediaQuery('(min-width:481px)')

  const { data, error, isLoading } = useSWR(
    `http://localhost:4000/message_list`,
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
        .get(`http://localhost:4000/message_list?page=${page}`)
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
      <Box sx={{ display: 'grid', gridTemplateColumns: '3fr 7fr' }}>
        <Box sx={{ height: '90vh', overflow: 'auto' }}>
          <MessageList
            data={messageList || []}
            error={error}
            isLoading={isLoading}
            spinner={spinner}
            setSelectedStatus={setSelectedStatus}
            isPc={isPc}
          />
          <Box sx={{ height: '5vh', visibility: 'hidden' }} ref={target}></Box>
        </Box>
        {isPc && <MessageChatPage selectedStatus={selectedStatus} />}
      </Box>
    </Container>
  )
}

export default MessageMain
