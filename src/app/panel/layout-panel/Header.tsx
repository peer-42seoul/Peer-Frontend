'use client'

import { AppBar, Box, Stack, Toolbar } from '@mui/material'
import SearchButton from '../main-page/SearchButton'
import AlertIcon from './AlertIcon'
import PeerLogo from '@/app/panel/layout-panel/PeerLogo'
import * as style from './Header.style'

/**
 * TODO : 상황에 따라 다른 헤더를 보여 줄 수 있어야 할 것 같습니다.
 * - 왼쪽 아이콘 (있을 수도 있고 없을 수도 있음)
 * - 중앙 로고 OR 페이지 설명
 * - 오른쪽 아이콘 (있을 수도 있고 없을 수도 있음)
 */

const Header = () => {
  return (
    <AppBar position="fixed" sx={style.mobileHeader}>
      <Toolbar disableGutters sx={style.mobileHeaderToolbar}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <AlertIcon />
          <Box sx={style.mobileHeaderTitle}>
            {/* 페이지별로 다른 제목이 들어갈 수 있어야 함. */}
            <PeerLogo sx={{ width: '3.375rem', height: '2.5rem' }} />
          </Box>
          <SearchButton />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header
