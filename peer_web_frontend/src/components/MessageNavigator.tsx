'use client'

import { Box, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/navigation'
import useMessageStore from '@/states/useMessageStore'

interface IMessageNavigatorProps {
  messageType: string
  title: string
}

const MessageNavigator = ({ messageType, title }: IMessageNavigatorProps) => {
  const { newChat, setNewChat } = useMessageStore()
  const router = useRouter()

  const onNewMessage = () => {
    setNewChat(true)
    router.push('http://localhost:3000/profile/message')
  }
  console.log(messageType)
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <svg
        onClick={() => {
          setNewChat(false)
          router.push('http://localhost:3000/profile/message')
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M10.828 12.0003L15.778 16.9503L14.364 18.3643L8 12.0003L14.364 5.63626L15.778 7.05126L10.828 12.0013V12.0003Z"
          fill="black"
        />
      </svg>
      <Typography>{title}</Typography>
      <Box>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z"
            fill="#1C1B1F"
          />
        </svg>
        {!newChat ||
          (messageType === 'inchatting' && (
            <svg
              onClick={() => {
                onNewMessage()
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12.8749 12.8749L21.0246 12.8749L21.0246 11.1252H12.8749L12.8749 2.97545H11.1251L11.1251 11.1252H2.97537L2.97537 12.8749 L11.1251 12.8749V21.0247H12.8749V12.8749Z"
                fill="black"
              />
            </svg>
          ))}
      </Box>
    </Box>
  )
}

export default MessageNavigator
