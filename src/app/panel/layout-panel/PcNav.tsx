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
  Typography,
} from '@mui/material'
import PeerLogo from '@/app/panel/layout-panel/PeerLogo'
import AlertIcon from '@/app/panel/layout-panel/AlertIcon'
import SearchButton from '@/app/panel/main-page/SearchButton'
import Link from 'next/link'
import { BorderColor, Favorite } from '@mui/icons-material'
import { BetaIcon } from '@/components/BetaBadge'

const PcNav = () => {
  const [value, setValue] = useState<
    'home' | 'hitchhiking' | 'team-list' | 'showcase'
  >('home')
  const { isTablet } = useMedia()
  const pathname = usePathname()
  const router = useRouter()
  const { isLogin } = useAuthStore()

  const interestsPath = isLogin
    ? '/my-page/interests'
    : '/login?redirect=/my-page/interests'

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
            <IconButton
              sx={{ margin: 0, padding: 0 }}
              onClick={() => {
                router.push('/')
              }}
            >
              <PeerLogo sx={{ width: 50, height: 50, color: 'text.normal' }} />
            </IconButton>
          </Stack>
          <BottomNavigation
            showLabels={true}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
          >
            <BottomNavigationAction
              value={'hitchhiking'}
              label={
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  spacing={'0.15rem'}
                >
                  <Typography
                    color={value === 'hitchhiking' ? 'primary' : 'normal'}
                    variant="Caption"
                  >
                    히치하이킹
                  </Typography>
                  <BetaIcon
                    style={{
                      position: 'relative',
                      top: '-0.5rem',
                    }}
                  />
                </Stack>
              }
              sx={{
                wordBreak: 'keep-all',
                padding: 0,
              }}
              onClick={() => {
                router.push('/hitchhiking')
              }}
            />

            <BottomNavigationAction
              value={'team-list'}
              label={
                <Typography
                  color={value === 'team-list' ? 'primary' : 'normal'}
                  variant="Caption"
                >
                  팀페이지
                </Typography>
              }
              onClick={() => {
                router.push('/team-list')
              }}
              sx={{ padding: 0 }}
            />
            <BottomNavigationAction
              value={'showcase'}
              label={
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  spacing={'0.15rem'}
                >
                  <Typography
                    color={value === 'showcase' ? 'primary' : 'normal'}
                    variant="Caption"
                  >
                    쇼케이스
                  </Typography>
                  <BetaIcon
                    style={{
                      position: 'relative',
                      top: '-0.5rem',
                    }}
                  />
                </Stack>
              }
              onClick={() => {
                router.push('/showcase')
              }}
              sx={{ padding: 0 }}
            />
          </BottomNavigation>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} gap={'0.25rem'}>
          <AlertIcon />
          <SearchButton />
          <Link href={interestsPath}>
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
