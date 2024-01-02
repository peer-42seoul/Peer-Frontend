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
  const [value, setValue] = useState<
    'home' | 'hitchhiking' | 'team-list' | 'showcase' | 'my-page'
  >('home')
  const pathname = usePathname()
  const router = useRouter()
  const { isLogin } = useAuthStore()

  const bottomNavStyle = {
    minWidth: 'auto',
    padding: '6px 0',
  }

  useEffect(() => {
    if (pathname === '/') {
      setValue('home')
    } else if (pathname === '/team-list') {
      setValue('team-list')
    } else if (pathname === '/hitchhiking') {
      setValue('hitchhiking')
    } else if (pathname === '/my-page') {
      setValue('my-page')
    } else if (pathname === '/showcase') {
      setValue('showcase')
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
        zIndex: 1300, // NOTE : 가능한 가장 높은 값으로 설정한 것이므로 이 값은 높이지 말아주세요. (낮추는건 괜찮습니다.)
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          sx={bottomNavStyle}
          icon={<HomeOutlinedIcon />}
          label="홈"
          value={'home'}
          onClick={() => {
            router.push('/')
          }}
        />
        <BottomNavigationAction
          sx={bottomNavStyle}
          icon={<ThumbUpAltOutlinedIcon />}
          label="히치하이킹"
          value={'hitchhiking'}
          onClick={() => {
            router.push('/hitchhiking')
          }}
        />
        <BottomNavigationAction
          sx={bottomNavStyle}
          label="쇼케이스"
          value={'showcase'}
          onClick={() => {
            router.push('/showcase')
          }}
          icon={<GroupOutlinedIcon />}
        />
        <BottomNavigationAction
          sx={bottomNavStyle}
          label="팀페이지"
          value={'team-list'}
          onClick={() => {
            router.push('/team-list')
          }}
          icon={<TabletMacOutlinedIcon />}
        />
        <BottomNavigationAction
          sx={bottomNavStyle}
          label="내 프로필"
          value={'my-page'}
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
  const [value, setValue] = useState<
    'home' | 'hitchhiking' | 'team-list' | 'showcase'
  >('home')
  const { isTablet } = useMedia()
  const pathname = usePathname()
  const router = useRouter()
  const { isLogin } = useAuthStore()

  useEffect(() => {
    if (pathname === '/') {
      setValue('home')
    } else if (pathname === '/team-list') {
      setValue('team-list')
    } else if (pathname === '/hitchhiking') {
      setValue('hitchhiking')
    } else if (pathname === '/showcase') {
      setValue('showcase')
    }
  }, [pathname])

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        overflow: 'hidden',
        zIndex: 1300, // NOTE : 가능한 가장 높은 값으로 설정한 것이므로 이 값은 높이지 말아주세요. (낮추는건 괜찮습니다.)
        backgroundColor: 'background.primary',
      }}
    >
      <Stack direction={'row'}>
        <Stack alignItems={'center'} justifyContent={'center'}>
          <PeerLogo sx={{ width: 50, height: 50 }} />
        </Stack>
        <BottomNavigation
          showLabels={true}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            value={'home'}
            label="홈"
            onClick={() => {
              router.push('/')
            }}
          />
          <BottomNavigationAction
            value={'hitchhiking'}
            label="히치하이킹"
            onClick={() => {
              router.push('/hitchhiking')
            }}
          />

          <BottomNavigationAction
            value={'team-list'}
            label="팀페이지"
            onClick={() => {
              router.push('/team-list')
            }}
          />
          <BottomNavigationAction
            value={'showcase'}
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
