import { useEffect, useState } from 'react'
import useMedia from '@/hook/useMedia'
import { usePathname, useRouter } from 'next/navigation'
import useAuthStore from '@/states/useAuthStore'
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  IconButton,
  Stack,
} from '@mui/material'
import PeerLogo from '@/app/panel/layout-panel/PeerLogo'
import AlertIcon from '@/app/panel/layout-panel/AlertIcon'
import SearchButton from '@/app/panel/main-page/SearchButton'
import Link from 'next/link'
import { BorderColor, Favorite } from '@mui/icons-material'

const PcNav = () => {
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
    } else if (pathname.includes('/team-list')) {
      setValue('team-list')
    } else if (pathname.includes('/hitchhiking')) {
      setValue('hitchhiking')
    } else if (pathname.includes('/showcase')) {
      setValue('showcase')
    }
  }, [pathname])

  return (
    <Stack
      direction={'row'}
      justifyContent={'center'}
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
      <Stack
        direction={'row'}
        maxWidth={1280}
        width="100%"
        justifyContent={'space-between'}
      >
        <Stack direction={'row'} gap={'1.25rem'}>
          <Stack alignItems={'center'} justifyContent={'center'}>
            <PeerLogo sx={{ width: 50, height: 50, color: 'text.normal' }} />
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
              label="모집글"
              onClick={() => {
                router.push('/')
              }}
            />
            <BottomNavigationAction
              value={'hitchhiking'}
              label="히치하이킹"
              sx={{
                wordBreak: 'keep-all',
              }}
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
        <Stack direction={'row'} alignItems={'center'} gap={'0.25rem'}>
          <AlertIcon />
          <SearchButton />
          <Link href="/my-page/interests">
            <IconButton sx={{ color: 'purple.strong' }} aria-label="favorites">
              <Favorite />
            </IconButton>
          </Link>
          <Avatar
            sx={{
              cursor: 'pointer',
              marginX: '0.5rem',
              width: '2rem',
              height: '2rem',
            }}
            onClick={() =>
              router.push(
                isLogin
                  ? '/my-page/profile'
                  : '/login?redirect=/my-page/profile',
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
              <Button
                sx={{
                  marginLeft: '0.5rem',
                }}
                variant="contained"
              >
                모집글 쓰기
              </Button>
            )}
          </Link>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default PcNav
