'use client'
import useMedia from '@/hook/useMedia'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
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

const NavBar = () => {
  const router = useRouter()
  const pathName = usePathname()
  const [value, setValue] = useState<TabValue>('profile')
  const { isPc } = useMedia()

  useEffect(() => {
    setValue(getTabValue(pathName))
  }, [pathName])

  if (!isPc) {
    return <div></div>
  }

  return (
    <Box sx={style.pcNavBar}>
      <Typography>마이페이지</Typography>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={style.pcTabs}
        variant="fullWidth"
      >
        <Tab
          label="프로필"
          onClick={() => router.push('/my-page/profile')}
          value={'profile'}
          sx={isPc ? style.pcTab : style.mobileTab}
        />
        <Tab
          label="관심리스트"
          onClick={() => router.push('/my-page/interests')}
          value={'interests'}
          sx={isPc ? style.pcTab : style.mobileTab}
        />
        <Tab
          label="쪽지"
          onClick={() => router.push('/my-page/message')}
          value={'message'}
          sx={isPc ? style.pcTab : style.mobileTab}
        />
        <Tab
          label="개인정보"
          onClick={() => router.push('/my-page/privacy')}
          value={'privacy'}
          sx={isPc ? style.pcTab : style.mobileTab}
        />
        <Tab
          label="홈페이지 설정"
          onClick={() => router.push('/my-page/homepage-setting')}
          value={'homepage-setting'}
          sx={isPc ? style.pcTab : style.mobileTab}
        />
      </Tabs>
    </Box>
  )
}

export default NavBar
