'use client'

import { Box, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/navigation'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

interface IMessageNavigatorProps {
  title: string
}

const MessageNavigator = ({ title }: IMessageNavigatorProps) => {
  const router = useRouter()

  const onNewMessage = () => {
    router.push('http://localhost:3000/profile/message/write')
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <ArrowBackIosIcon
        onClick={() => {
          router.push('http://localhost:3000/profile/message')
        }}
      />
      <Typography>{title}</Typography>
      <Box>
        <SearchIcon />
        <AddIcon onClick={onNewMessage} />
      </Box>
    </Box>
  )
}

export default MessageNavigator
