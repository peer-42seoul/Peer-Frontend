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
  Stack,
} from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SearchButton from './SearchButton'
import Link from 'next/link'
import useMedia from '@/hook/useMedia'
import useAuthStore from '@/states/useAuthStore'

export const MobileNav = () => {
  const [value, setValue] = useState(0)
  const pathname = usePathname()
  const router = useRouter()
  const { isLogin } = useAuthStore()

  useEffect(() => {
    if (pathname === '/') {
      setValue(0)
    } else if (pathname === '/team-list') {
      setValue(3)
    } else if (pathname === '/my-page') {
      setValue(4)
    }
  }, [pathname])

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
            router.push(isLogin ? '/my-page' : '/login')
          }}
        />
      </BottomNavigation>
    </Paper>
  )
}

export const PcNav = () => {
  const [value, setValue] = useState(0)
  const { isTablet } = useMedia()
  const pathname = usePathname()
  const router = useRouter()
  const { isLogin } = useAuthStore()

  useEffect(() => {
    if (pathname === '/') {
      setValue(0)
    } else if (pathname === '/team-list') {
      setValue(3)
    }
  }, [pathname])
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
      <Stack direction={'row'} alignItems={'center'}>
        <IconButton color="inherit" aria-label="menu">
          <NotificationsNoneOutlined />
        </IconButton>
        <SearchButton />
        <Link href="/my-page/interests">
          <IconButton aria-label="favorites">
            <Favorite />
          </IconButton>
        </Link>
        <Avatar
          onClick={() => router.push(isLogin ? '/my-page/profile' : '/login')}
        />
        <Link href={'/recruit/write'}>
          {isTablet ? (
            <IconButton>
              <BorderColor />
            </IconButton>
          ) : (
            <Button variant="outlined" startIcon={<BorderColor />}>
              새 글쓰기
            </Button>
          )}
        </Link>
      </Stack>
    </Stack>
  )
}
