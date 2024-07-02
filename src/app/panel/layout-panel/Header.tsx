'use client'

import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  alpha,
  useTheme,
  IconButton,
  Typography,
} from '@mui/material'
import SearchButton from '../main-page/SearchButton'
import AlertIcon from './AlertIcon'
import PeerLogo from '@/app/panel/layout-panel/PeerLogo'
import * as style from './Header.style'
import { useRouter, useSearchParams } from 'next/navigation'
import CloseIcon from '../../../icons/CloseIcon'
import BackIcon from '@/icons/Nav/BackIcon'
import useHeaderStore from '@/states/useHeaderStore'
import { useEffect, useState } from 'react'
import useAuthStore from '@/states/useAuthStore'

/**
 * TODO : 상황에 따라 다른 헤더를 보여 줄 수 있어야 할 것 같습니다.
 * - 왼쪽 아이콘 (있을 수도 있고 없을 수도 있음)
 * - 중앙 로고 OR 페이지 설명
 * - 오른쪽 아이콘 (있을 수도 있고 없을 수도 있음)
 */

const Header = ({
  pathname,
  backAction,
}: {
  pathname?: string
  backAction?: () => void
}) => {
  const theme = useTheme()
  const mobileHeader = {
    ...style.mobileHeader,
    backgroundColor: alpha(theme.palette.background.primary, 0.8),
  }
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword') ?? ''
  const type = searchParams.get('type') ?? 'STUDY'
  const regex = /^\/recruit\/\d+\/edit$/

  useEffect(() => {
    if (!pathname) return setTitle('')
    if (pathname === '/') {
      if (keyword !== '') setTitle('검색 결과')
      else setTitle('메인')
    } else if (pathname.startsWith('/login')) {
      setTitle('로그인')
    } else if (pathname === '/recruit/write') {
      setTitle('모집글작성')
    } else if (regex.test(pathname)) {
      setTitle('모집글수정')
    } else if (pathname.startsWith('/team-list')) {
      if (!isLogin) {
        router.push('/login?redirect=/team-list')
      } else setTitle('나의 팀')
    } else if (pathname.startsWith('/my-page')) {
      if (!isLogin) {
        router.push('/login?redirect=/my-page')
      } else setTitle('마이페이지')
    } else if (pathname.startsWith('/job')) {
      setTitle('채용공고')
    } else {
      setTitle('')
    }
  }, [keyword, pathname])
  const { headerTitle } = useHeaderStore()

  // 타이틀만 보여주고 싶은 경우 (뒤로 가기 버튼이 보이지 않았으면 하는 경우)
  const onlyTitle =
    pathname?.startsWith('/my-page') ||
    pathname?.startsWith('/team-list') ||
    pathname?.startsWith('/login')

  return (
    <AppBar position="fixed" sx={mobileHeader}>
      <Toolbar disableGutters sx={style.mobileHeaderToolbar}>
        {pathname === '/' && keyword === '' ? (
          <Stack sx={style.mobileHeaderStack}>
            <AlertIcon />
            <Box sx={style.mobileHeaderTitle}>
              <PeerLogo
                sx={{
                  width: '3.375rem',
                  height: '2.5rem',
                  color: 'text.normal',
                }}
              />
            </Box>
            <SearchButton />
          </Stack>
        ) : (
          <Stack sx={style.mobileHeaderStack}>
            <IconButton
              onClick={() => {
                if (backAction) backAction()
                else if (pathname === '/' && keyword !== '') {
                  router.replace(`?type=${type}`)
                } else router.back()
              }}
              sx={{
                visibility: onlyTitle ? 'hidden' : 'visible',
              }}
            >
              <BackIcon />
            </IconButton>
            <Box sx={style.mobileHeaderTitle}>
              {/* headerTitle이 있는 경우: 페이지안에서 header를 설정하는 경우 (ex 모집글뷰, 나의 팀) */}
              <Typography fontSize={'0.8125rem'} fontWeight={700}>
                {headerTitle === '' ? title : headerTitle}
              </Typography>
            </Box>
            <IconButton
              sx={{
                visibility: 'hidden',
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
