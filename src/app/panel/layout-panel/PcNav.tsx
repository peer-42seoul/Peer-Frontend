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
import useSWR from 'swr'
import { IUserProfile } from '@/types/IUserProfile'
import useAxiosWithAuth from '@/api/config'
import { navContainerStyle, navStyle } from '@/app/panel/layout-panel/Nav.style'

const PcNav = () => {
  const [value, setValue] = useState<
    'home' | 'hitchhiking' | 'team-list' | 'showcase'
  >('home')
  const { isTablet } = useMedia()
  const pathname = usePathname()
  const router = useRouter()
  const { isLogin } = useAuthStore()
  const axiosWithAuth = useAxiosWithAuth()
  const interestsPath = isLogin
    ? '/my-page/interests'
    : '/login?redirect=/my-page/interests'

  const { data: profileData } = useSWR<IUserProfile>(
    isLogin ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile` : undefined,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

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
    <Stack sx={navContainerStyle}>
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
              label={<Typography fontSize={'0.8125rem'}>모집글</Typography>}
              onClick={() => {
                router.push('/')
              }}
              sx={navStyle}
            />
            <BottomNavigationAction
              icon={<BetaIcon />}
              value={'hitchhiking'}
              label={<Typography fontSize={'0.8125rem'}>히치하이킹</Typography>}
              sx={{
                ...navStyle,
                wordBreak: 'keep-all',
              }}
              onClick={() => {
                router.push('/hitchhiking')
              }}
            />

            <BottomNavigationAction
              value={'team-list'}
              label={<Typography fontSize={'0.8125rem'}>팀페이지</Typography>}
              onClick={() => {
                router.push('/team-list')
              }}
              sx={navStyle}
            />
            <BottomNavigationAction
              icon={<BetaIcon />}
              value={'showcase'}
              label={<Typography fontSize={'0.8125rem'}>쇼케이스</Typography>}
              onClick={() => {
                router.push('/showcase')
              }}
              sx={navStyle}
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
            src={profileData?.profileImageUrl}
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
