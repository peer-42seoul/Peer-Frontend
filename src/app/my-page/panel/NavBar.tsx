'use client'

import CuNavBar from '@/components/CuNavBar'
import {
  MessageIcon,
  HeartIcon,
  SettingIcon,
  SilhouetteIcon,
  WhaleIcon,
} from '@/icons/MyPage'
import { useRouter } from 'next/navigation'

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
  return (
    <CuNavBar
      getTabValue={getTabValue}
      title={'마이페이지'}
      tabData={[
        {
          label: '프로필',
          onClick: () => router.push('/my-page/profile'),
          value: 'profile',
          icon: <WhaleIcon width={'1.0625rem'} height={'0.875rem'} />,
        },
        {
          label: '관심리스트',
          onClick: () => router.push('/my-page/interests'),
          value: 'interests',
          icon: <HeartIcon width={'0.75rem'} height={'0.625rem'} />,
        },
        {
          label: '쪽지',
          onClick: () => router.push('/my-page/message'),
          value: 'message',
          icon: <MessageIcon width={'0.75rem'} height={'0.625rem'} />,
        },
        {
          label: '개인정보',
          onClick: () => router.push('/my-page/privacy'),
          value: 'privacy',
          icon: <SilhouetteIcon width={'0.625rem'} height={'0.625rem'} />,
        },
        {
          label: '홈페이지 설정',
          mobileLabel: '기기 설정',
          onClick: () => router.push('/my-page/homepage-setting'),
          value: 'homepage-setting',
          icon: <SettingIcon width={'0.75rem'} height={'0.75rem'} />,
        },
      ]}
    />
  )
}

export default NavBar
