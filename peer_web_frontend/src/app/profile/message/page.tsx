'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import MessageList from '@/app/profile/message/MessageList'
import { Box, Container } from '@mui/material'
import axios from 'axios'
import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

interface IUserInformation {
  nickname: string
  profileImage: string
  messageTime: string
  lastContent: string
}

const Page = () => {
  const target = useRef(null)
  const [page, setPage] = useState(1)
  const [spinner, setSpinner] = useState(false)
  const [messageList, setMessageList] = useState<IUserInformation[]>([])

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
    if (target.current) {
      observer.observe(target.current)
    }
    return () => {
      if (target.current) observer.unobserve(target.current)
    }
  }, [target, !spinner])

  return (
    <Container sx={{ height: '90vh' }}>
      <MessageList
        data={messageList || []}
        error={error}
        isLoading={isLoading}
        spinner={spinner}
      />
      <Box sx={{ height: '5vh' }} ref={target}></Box>
    </Container>
  )
}

export default Page
