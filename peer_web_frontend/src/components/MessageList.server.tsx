import { Box, Container, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import useSWR from 'swr'

interface IUserInformation {
  nickname: string
  profileImage: string
}

const MessageList = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data)
  const userId = '123' // 예시로 문자열 "123" 사용

  const { data, error } = useSWR(`/v1/api/message/list/${userId}`, fetcher)

  if (error) return <Box>데이터 불러오기를 실패하였습니다.</Box>
  return (
    <Container>
      <Box>
        {data.map((user: IUserInformation) => {
          return (
            <Box key={data.id}>
              <Typography>{user.nickname}</Typography>
              <Image src={user.profileImage} alt="user_profile" />
            </Box>
          )
        })}
      </Box>
    </Container>
  )
}

export default MessageList
