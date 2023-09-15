'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import MessageList from '@/app/profile/message/MessageList'
import { Container } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
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
  const { data, error, isLoading } = useSWR(
    `http://localhost:4000/message_list`,
    defaultGetFetcher,
  )
  const [messageList, setMessageList] = useState<IUserInformation[]>([])

  useEffect(() => {
    if (data) {
      setMessageList(data)
    }
  }, [data])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('entries: ', entries)
        if (entries[0].isIntersecting) {
          setPage((prev: number) => prev + 1)
        }
      },
      { threshold: 0.5 },
    )

    if (target.current) {
      observer.observe(target.current)
    }

    return () => {
      if (target.current) observer.unobserve(target.current)
    }
  }, [target.current])
  // 페이지가 변경될 때마다 API 요청을 보내는 useEffect를 추가합니다.
  useEffect(() => {
    axios
      .get(`http://localhost:4000/message_list?page=${page}`)
      .then((res) => {
        setMessageList((prevMessages) => [...prevMessages, ...res.data])
      })
      .catch((err) => console.log(err))
  }, [page])
  useEffect(() => {
    console.log('messageList', messageList)
  }, [messageList])
  return (
    <Container sx={{ height: '90vh' }}>
      <MessageList data={messageList} error={error} isLoading={isLoading} />
      <div style={{ height: '5vh', background: 'black' }} ref={target}>
        Target
      </div>
    </Container>
  )
}

export default Page
