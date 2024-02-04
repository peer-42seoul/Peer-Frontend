import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import useAuthStore from '@/states/useAuthStore'
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
} from '@mui/material'
import {
  HitchIcon,
  MyPageIcon,
  RecruitIcon,
  ShowcaseIcon,
  TeamsIcon,
} from '@/icons/Nav'
import { bottomNavStyle } from './MobileNav.style'

const MobileNav = () => {
  const [value, setValue] = useState<
    'home' | 'hitchhiking' | 'team-list' | 'showcase' | 'my-page' | ''
  >('home')
  const pathname = usePathname()
  const router = useRouter()
  const { isLogin } = useAuthStore()

  useEffect(() => {
    if (pathname === '/') {
      setValue('home')
    } else if (pathname.startsWith('/team-list')) {
      setValue('team-list')
    } else if (pathname.startsWith('/hitchhiking')) {
      setValue('hitchhiking')
    } else if (pathname.startsWith('/my-page')) {
      if (!isLogin) return router.push('/login?redirect=/my-page')
      else setValue('my-page')
    } else if (pathname.startsWith('/showcase')) {
      setValue('showcase')
    } else if (pathname.startsWith('/login')) {
      setValue('')
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
        showLabels
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        sx={{ paddingX: '1rem', paddingBottom: '1.25rem' }}
      >
        <BottomNavigationAction
          sx={bottomNavStyle}
          icon={<RecruitIcon />}
          label={<Typography fontSize={'0.6875rem'}>모집글</Typography>}
          value={'home'}
          onClick={() => {
            router.push('/')
          }}
        />
        <BottomNavigationAction
          sx={bottomNavStyle}
          icon={<HitchIcon />}
          label={<Typography fontSize={'0.6875rem'}>히치하이킹</Typography>}
          value={'hitchhiking'}
          onClick={() => {
            router.push('/hitchhiking')
          }}
        />
        <BottomNavigationAction
          sx={bottomNavStyle}
          label={<Typography fontSize={'0.6875rem'}>쇼케이스</Typography>}
          value={'showcase'}
          onClick={() => {
            router.push('/showcase')
          }}
          icon={<ShowcaseIcon />}
        />
        <BottomNavigationAction
          sx={bottomNavStyle}
          label={<Typography fontSize={'0.6875rem'}>팀페이지</Typography>}
          value={'team-list'}
          onClick={() => {
            router.push('/team-list')
          }}
          icon={<TeamsIcon />}
        />
        <BottomNavigationAction
          sx={bottomNavStyle}
          label={<Typography fontSize={'0.6875rem'}>내 프로필</Typography>}
          value={'my-page'}
          onClick={() => {
            router.push('/my-page')
          }}
          icon={<MyPageIcon />}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default MobileNav
