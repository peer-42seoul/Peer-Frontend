'use client'

import { BorderColor, Favorite } from '@mui/icons-material'
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
import SearchButton from '../main-page/SearchButton'
import Link from 'next/link'
import useMedia from '@/hook/useMedia'
import useAuthStore from '@/states/useAuthStore'
import AlertIcon from './AlertIcon'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import TabletMacOutlinedIcon from '@mui/icons-material/TabletMacOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PeerLogo from '@/app/panel/layout-panel/PeerLogo'

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
        zIndex: 1300, // NOTE : sideeffect 우려로 설정할 수 있는 가장 높은 index로 설정함. zIndex를 제거할 수 있으면 좋을 듯.
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          icon={<HomeOutlinedIcon />}
          label="홈"
          onClick={() => {
            router.push('/')
          }}
        />
        <BottomNavigationAction
          icon={<ThumbUpAltOutlinedIcon />}
          label="히치하이킹"
          onClick={() => {
            router.push('/')
          }}
        />
        <BottomNavigationAction
          label="쇼케이스"
          onClick={() => {
            router.push('/showcase')
          }}
          icon={<GroupOutlinedIcon />}
        />
        <BottomNavigationAction
          label="팀페이지"
          onClick={() => {
            router.push('/team-list')
          }}
          icon={<TabletMacOutlinedIcon />}
        />
        <BottomNavigationAction
          label="내 프로필"
          onClick={() => {
            router.push(isLogin ? '/my-page' : '/login?redirect=/my-page')
          }}
          icon={<PersonOutlineOutlinedIcon />}
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
      setValue(2)
    }
  }, [pathname])
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        overflow: 'hidden',
        zIndex: 1300, // NOTE : sideeffect 우려로 설정할 수 있는 가장 높은 index로 설정함. zIndex를 제거할 수 있으면 좋을 듯.
        backgroundColor: 'background.primary',
        paddingX: 3,
      }}
    >
      <Stack direction={'row'}>
        <Stack alignItems={'center'} justifyContent={'center'}>
          <PeerLogo sx={{ width: 50, height: 50 }} />
        </Stack>
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
              router.push('/showcase')
            }}
          />
        </BottomNavigation>
      </Stack>
      <Stack direction={'row'} alignItems={'center'}>
        <AlertIcon />
        <SearchButton />
        <Link href="/my-page/interests">
          <IconButton sx={{ color: 'purple.strong' }} aria-label="favorites">
            <Favorite />
          </IconButton>
        </Link>
        <Avatar
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            router.push(
              isLogin ? '/my-page/profile' : '/login?redirect=/my-page/profile',
            )
          }
        />
        <Link
          href={isLogin ? '/recruit/write' : '/login?redirect=/recruit/write'}
        >
          {isTablet ? (
            <IconButton>
              <BorderColor color={'primary'} />
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
