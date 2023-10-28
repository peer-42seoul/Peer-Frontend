'use client'

import {
  BorderColor,
  Favorite,
  NotificationsNoneOutlined,
} from '@mui/icons-material'
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  IconButton,
  Paper,
  Stack
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SearchButton from './SearchButton'
import Link from 'next/link'
import useMedia from '@/hook/useMedia'

export const MobileNav = () => {
  const [value, setValue] = useState(0)
  const router = useRouter()

  return (
    <Paper
      sx={{
        width: '100vw',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        zIndex: 999,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          label="홈"
          onClick={() => {
            router.push('/')
          }}
        />
        <BottomNavigationAction
          label="히치하이킹"
          onClick={() => {
            router.push('/')
          }}
        />
        <BottomNavigationAction
          label="쇼케이스"
          onClick={() => {
            router.push('/')
          }}
        />
        <BottomNavigationAction
          label="팀페이지"
          onClick={() => {
            router.push('/team-list')
          }}
        />
        <BottomNavigationAction
          label="내 프로필"
          onClick={() => {
            router.push('/my-page')
          }}
        />
      </BottomNavigation>
    </Paper>
  )
}

//추후 url에 따라 버튼이 달라지도록 구현 필요
export const PcNav = () => {
  const [value, setValue] = useState(0)
  const { isTablet } = useMedia();
  const router = useRouter()

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        overflow: 'hidden',
        zIndex: 999,
        backgroundColor: 'white',
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          label="홈"
          onClick={() => {
            router.push('/')
          }}
        />
        <BottomNavigationAction
          label="히치하이킹"
          onClick={() => {
            router.push('/')
          }}
        />

        <BottomNavigationAction
          label="팀페이지"
          onClick={() => {
            router.push('/team-list')
          }}
        />
        <BottomNavigationAction
          label="쇼케이스"
          onClick={() => {
            router.push('/')
          }}
        />
      </BottomNavigation>
      <Stack direction={'row'} alignItems={"center"}>
        <IconButton color="inherit" aria-label="menu">
          <NotificationsNoneOutlined />
        </IconButton>
        <SearchButton />
        <Link href="/my-page/interests">
          <IconButton aria-label="favorites">
            <Favorite />
          </IconButton>
        </Link>
        <Link href="/my-page/profile">
          <Avatar />
        </Link>
        <Link href={'/recruitment'}>
          {isTablet ?
            <IconButton>
              <BorderColor />
            </IconButton> :
            <Button variant="outlined" startIcon={<BorderColor />}>새 글쓰기</Button>}
        </Link>
      </Stack>
    </Stack>
  )
}

