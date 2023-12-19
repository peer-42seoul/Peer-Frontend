'use client'
import useMedia from '@/hook/useMedia'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  WhaleIcon,
  MyPageHeartIcon,
  FilledMessageIcon,
  SilhouetteIcon,
  SettingIcon,
} from '@/icons'
import * as style from './NavBar.style'

type TabValue =
  | 'profile'
  | 'interests'
  | 'message'
  | 'privacy'
  | 'homepage-setting'

const getTabValue = (path: string) => {
  if (path.startsWith('/my-page/profile')) return 'profile'
  else if (path.startsWith('/my-page/interests')) return 'interests'
  else if (path.startsWith('/my-page/message')) return 'message'
  else if (path.startsWith('/my-page/privacy')) return 'privacy'
  else if (path.startsWith('/my-page/homepage-setting'))
    return 'homepage-setting'
  else return 'profile'
}

// interface IStyledTabProps {
//   label: string
//   onClick: () => void
//   value: TabValue
//   icon: ReactElement
//   isPc: boolean
// }

// NOTE : 중복 코드를 줄이고 스타일을 편하게 적용하고 싶은데 외부 컴포넌트로 빼면 스타일이 적용이 안되는 문제가 있음
// const StyledTab = ({ label, onClick, value, icon, isPc }: IStyledTabProps) => {
//   return (
//     <Tab
//       label={label}
//       onClick={onClick}
//       value={value}
//       icon={icon}
//       iconPosition={isPc ? 'start' : 'top'}
//       sx={isPc ? style.pcTab : style.mobileTab}
//     />
//   )
// }

const NavBar = () => {
  const router = useRouter()
  const pathName = usePathname()
  const [value, setValue] = useState<TabValue>('profile')
  const { isPc } = useMedia()

  useEffect(() => {
    setValue(getTabValue(pathName))
  }, [pathName])

  return (
    <Box sx={isPc ? style.pcNavBar : style.mobileNavBar}>
      {isPc && <Typography>마이페이지</Typography>}
      <Tabs
        orientation={isPc ? 'vertical' : 'horizontal'}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={isPc ? style.pcTabs : style.mobileTabs}
        variant="fullWidth"
        textColor="primary"
      >
        <Tab
          label="프로필"
          onClick={() => router.push('/my-page/profile')}
          value={'profile'}
          icon={<WhaleIcon sx={isPc ? style.pcIcon : style.mobileWhale} />}
          iconPosition={isPc ? 'start' : 'top'}
          sx={isPc ? style.pcTab : style.mobileTab}
        />
        <Tab
          label="관심리스트"
          onClick={() => router.push('/my-page/interests')}
          value={'interests'}
          icon={
            <MyPageHeartIcon sx={isPc ? style.pcIcon : style.mobileHeart} />
          }
          iconPosition={isPc ? 'start' : 'top'}
          sx={isPc ? style.pcTab : style.mobileTab}
        />
        <Tab
          label="쪽지"
          onClick={() => router.push('/my-page/message')}
          value={'message'}
          icon={
            <FilledMessageIcon sx={isPc ? style.pcIcon : style.mobileMessage} />
          }
          iconPosition={isPc ? 'start' : 'top'}
          sx={isPc ? style.pcTab : style.mobileTab}
        />
        <Tab
          label="개인정보"
          onClick={() => router.push('/my-page/privacy')}
          value={'privacy'}
          icon={
            <SilhouetteIcon sx={isPc ? style.pcIcon : style.mobileSilhouette} />
          }
          iconPosition={isPc ? 'start' : 'top'}
          sx={isPc ? style.pcTab : style.mobileTab}
        />
        <Tab
          label={isPc ? '홈페이지 설정' : '기기 설정'}
          onClick={() => router.push('/my-page/homepage-setting')}
          value={'homepage-setting'}
          icon={<SettingIcon sx={isPc ? style.pcIcon : style.mobileSetting} />}
          iconPosition={isPc ? 'start' : 'top'}
          sx={isPc ? style.pcTab : style.mobileTab}
        />
      </Tabs>
    </Box>
  )
}

export default NavBar
