'use client'

import { NotificationsNoneOutlined } from '@mui/icons-material'
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  IconButton,
  Paper,
  Stack,
  useMediaQuery,
} from '@mui/material'
import { useRouter } from 'next/navigation'

import { Dispatch, SetStateAction, useState } from 'react'
import SearchButton from './SearchButton'

interface INavProps {
  value: number
  setValue: Dispatch<SetStateAction<number>>
}

const PcNav = ({ value, setValue }: INavProps) => {
  const router = useRouter()

  return (
    <Stack
      direction={'row'}
      sx={{
        width: '100vw',
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        overflow: 'hidden',
        zIndex: 999,
      }}>
      <Box flex={1}>
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
      </Box>
      <Box flex={1}>
        <IconButton color="inherit" aria-label="menu">
          <NotificationsNoneOutlined />
        </IconButton>
        <IconButton color="inherit" aria-label="menu">
          <SearchButton />
        </IconButton>
      </Box>
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
            router.push('/teams')
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
  const isPc = useMediaQuery('(min-width:481px)')
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
