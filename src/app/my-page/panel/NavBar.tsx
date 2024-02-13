'use client'

import { useRouter } from 'next/navigation'
import CuNavBar from '@/components/CuNavBar'
import {
  MessageIcon,
  HeartIcon,
  SettingIcon,
  SilhouetteIcon,
  WhaleIcon,
} from '@/icons/MyPage'
import * as style from './NavBar.style'
import * as navStyle from '@/components/NavBarBox.style'
import { Box } from '@mui/material'
import useMedia from '@/hook/useMedia'

const getTabValue = (path: string) => {
  if (path.startsWith('/my-page/profile')) return 'profile'
  else if (path.startsWith('/my-page/interests')) return 'interests'
  else if (path.startsWith('/my-page/message')) return 'message'
  else if (path.startsWith('/my-page/privacy')) return 'privacy'
  else if (path.startsWith('/my-page/homepage-setting'))
    return 'homepage-setting'
  else return 'profile'
}

const NavBar = () => {
  const router = useRouter()
  const { isPc } = useMedia()
  return (
    <Box sx={isPc ? navStyle.pcNavBar : navStyle.mobileNavBar}>
      <CuNavBar
        getTabValue={getTabValue}
        title={'마이페이지'}
        tabData={[
          {
            label: '프로필',
            onClick: () => router.push('/my-page/profile'),
            value: 'profile',
            icon: <WhaleIcon sx={style.whale} />,
          },
          {
            label: '관심리스트',
            onClick: () => router.push('/my-page/interests'),
            value: 'interests',
            icon: <HeartIcon sx={style.heart} />,
          },
          {
            label: '쪽지',
            onClick: () => router.push('/my-page/message'),
            value: 'message',
            icon: <MessageIcon sx={style.message} />,
          },
          {
            label: '개인정보',
            onClick: () => router.push('/my-page/privacy'),
            value: 'privacy',
            icon: <SilhouetteIcon sx={style.silhouette} />,
          },
          {
            label: '홈페이지 설정',
            mobileLabel: '기기 설정',
            onClick: () => router.push('/my-page/homepage-setting'),
            value: 'homepage-setting',
            icon: <SettingIcon sx={style.setting} />,
          },
        ]}
      />
    </Box>
  )
}

export default NavBar
