import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import useAuthStore from '@/states/useAuthStore'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import RecruitIcon from '@/icons/Nav/RecruitIcon'
import HitchIcon from '@/icons/Nav/HitchIcon'
import ShowcaseIcon from '@/icons/Nav/ShowcaseIcon'
import TeamsIcon from '@/icons/Nav/TeamsIcon'
import MyPageIcon from '@/icons/Nav/MyPageIcon'

const MobileNav = () => {
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
        showLabels
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          sx={bottomNavStyle}
          icon={<RecruitIcon />}
          label="모집글"
          value={'home'}
          onClick={() => {
            router.push('/')
          }}
        />
        <BottomNavigationAction
          sx={bottomNavStyle}
          icon={<HitchIcon />}
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
          icon={<ShowcaseIcon />}
        />
        <BottomNavigationAction
          sx={bottomNavStyle}
          label="팀페이지"
          value={'team-list'}
          onClick={() => {
            router.push('/team-list')
          }}
          icon={<TeamsIcon />}
        />
        <BottomNavigationAction
          sx={bottomNavStyle}
          label="내 프로필"
          value={'my-page'}
          onClick={() => {
            router.push(isLogin ? '/my-page' : '/login?redirect=/my-page')
          }}
          icon={<MyPageIcon />}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default MobileNav
