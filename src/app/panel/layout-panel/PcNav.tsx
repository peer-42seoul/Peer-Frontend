import { useEffect, useState } from 'react'
import useMedia from '@/hook/useMedia'
import { usePathname, useRouter } from 'next/navigation'
import useAuthStore from '@/states/useAuthStore'
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import PeerLogo from '@/app/panel/layout-panel/PeerLogo'
import AlertIcon from '@/app/panel/layout-panel/AlertIcon'
import SearchButton from '@/app/panel/main-page/SearchButton'
import Link from 'next/link'
import { Favorite } from '@mui/icons-material'
import { BetaIcon } from '@/components/BetaBadge'
import WriteIcon from '@/icons/Nav/WriteIcon'
import useSWR from 'swr'
import { IUserProfile } from '@/types/IUserProfile'
import useAxiosWithAuth from '@/api/config'
import { navContainerStyle, navStyle } from '@/app/panel/layout-panel/Nav.style'

const PcNav = () => {
  const [value, setValue] = useState<
    'home' | 'hitchhiking' | 'team-list' | 'showcase' | 'job'
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
    isLogin ? `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/profile` : undefined,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

  useEffect(() => {
    if (pathname === '/') {
      setValue('home')
    } else if (
      pathname.startsWith('/team-list') ||
      pathname.startsWith('/teams')
    ) {
      setValue('team-list')
    } else if (pathname.startsWith('/hitchhiking')) {
      setValue('hitchhiking')
    } else if (pathname.startsWith('/showcase')) {
      setValue('showcase')
    } else {
      setValue('home')
    }
  }, [pathname])

  return (
    <Box sx={navContainerStyle}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
        component={'nav'}
      >
        <Stack direction={'row'} gap={'1.25rem'}>
          <Stack alignItems={'center'} justifyContent={'center'}>
            <IconButton
              sx={{ margin: 0, padding: 0 }}
              onClick={() => {
                router.push('/')
              }}
              aria-label="peer-logo"
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
                    color={value === 'hitchhiking' ? 'primary' : 'text.normal'}
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
                ...navStyle,
                wordBreak: 'keep-all',
              }}
              onClick={() => {
                router.push('/hitchhiking')
              }}
            />

            <BottomNavigationAction
              value={'team-list'}
              label={
                <Typography
                  color={value === 'team-list' ? 'primary' : 'text.normal'}
                  variant="Caption"
                >
                  나의 팀
                </Typography>
              }
              onClick={() => {
                router.push('/team-list')
              }}
              sx={navStyle}
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
                    color={value === 'showcase' ? 'primary' : 'text.normal'}
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
              sx={{
                ...navStyle,
                wordBreak: 'keep-all',
              }}
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
                <WriteIcon color={'primary'} />
              </IconButton>
            ) : (
              <Button
                sx={{
                  marginLeft: '0.5rem',
                }}
                variant="contained"
              >
                모집글쓰기
              </Button>
            )}
          </Link>
        </Stack>
      </Container>
    </Box>
  )
}

export default PcNav
