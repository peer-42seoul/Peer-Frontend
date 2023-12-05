'use client'
import useMedia from '@/hook/useMedia'
import { Box, SxProps, Tab, Tabs, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

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

const SubNavBar = ({ sx }: { sx: SxProps }) => {
  const router = useRouter()
  const pathName = usePathname()
  const [value, setValue] = useState<TabValue>('profile')
  const { isPc } = useMedia()

  const tabStyle: SxProps = {
    maxWidth: '244px',
    padding: '0 32px',
    width: '100%',
  }

  useEffect(() => {
    setValue(getTabValue(pathName))
  }, [pathName])

  if (!isPc) {
    return <div></div>
  }

  return (
    <Box
      sx={{
        p: '24px 32px',
        ...sx,
      }}
    >
      <Typography>마이페이지</Typography>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          borderColor: 'divider',
          gap: '4px',
        }}
        variant="fullWidth"
      >
        <Tab
          label="프로필"
          onClick={() => router.push('/my-page/profile')}
          value={'profile'}
          sx={tabStyle}
        />
        <Tab
          label="관심리스트"
          onClick={() => router.push('/my-page/interests')}
          sx={tabStyle}
          value={'interests'}
        />
        <Tab
          label="쪽지"
          onClick={() => router.push('/my-page/message')}
          sx={tabStyle}
          value={'message'}
        />
        <Tab
          label="개인정보"
          onClick={() => router.push('/my-page/privacy')}
          sx={tabStyle}
          value={'privacy'}
        />
        <Tab
          label="홈페이지 설정"
          onClick={() => router.push('/my-page/homepage-setting')}
          sx={tabStyle}
          value={'homepage-setting'}
        />
      </Tabs>
    </Box>
  )
}

export default SubNavBar
