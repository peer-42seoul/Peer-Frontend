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
import { useRouter } from 'next/navigation'

import { Dispatch, SetStateAction, useState } from 'react'
import SearchButton from './SearchButton'
import useMedia from '@/hook/useMedia'

interface INavProps {
  value: number
  setValue: Dispatch<SetStateAction<number>>
}

const PcNav = ({ value, setValue }: INavProps) => {
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
          label="로고"
          onClick={() => {
            router.push('/')
          }}
        />
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
            router.push('/')
          }}
        />
        <BottomNavigationAction
          label="쇼케이스"
          onClick={() => {
            router.push('/')
          }}
        />
      </BottomNavigation>
      <Stack direction={'row'}>
        <IconButton color="inherit" aria-label="menu">
          <NotificationsNoneOutlined />
        </IconButton>
        <IconButton color="inherit" aria-label="menu">
          <SearchButton />
        </IconButton>
        {/*<Link>*/}
        <IconButton aria-label="favorites">
          <Favorite />
        </IconButton>
        {/*</Link>*/}
        <Avatar alt="profile" src="" />
        <Button variant="outlined" startIcon={<BorderColor />}>
          새 글쓰기
        </Button>
      </Stack>
    </Stack>
  )
}

const MobileNav = ({ value, setValue }: INavProps) => {
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
            router.push('/')
          }}
        />
        <BottomNavigationAction
          label="내 프로필"
          onClick={() => {
            router.push('/profile/MyPage')
          }}
        />
      </BottomNavigation>
    </Paper>
  )
}

const NavBar = () => {
  const { isPc } = useMedia()
  const [value, setValue] = useState(0)

  return (
    <div>
      {isPc ? (
        <PcNav value={value} setValue={setValue} />
      ) : (
        <MobileNav value={value} setValue={setValue} />
      )}
    </div>
  )
}

export default NavBar
