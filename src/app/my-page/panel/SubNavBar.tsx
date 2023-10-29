'use client'
import useMedia from '@/hook/useMedia'
import { Box, SxProps, Tab, Tabs, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'

const getTabValue = (path: string) => {
  switch (path) {
    case '/my-page/profile':
      return 0

    case '/my-page/interests':
      return 1

    case '/my-page/messages':
      return 2

    case '/my-page/privacy':
      return 3

    case 'my-page/homepage-setting':
      return 4

    default:
      return 0
  }
}

const SubNavBar = () => {
  const router = useRouter()
  console.log(router)
  const pathName = usePathname()
  console.log(pathName)
  const [value, setValue] = useState(getTabValue(pathName))
  const { isPc } = useMedia()

  const tabStyle: SxProps = { maxWidth: '244px', padding: '0 24px' }

  if (!isPc) {
    return <div></div>
  }

  // console.log(pathName)

  return (
    <Box
      sx={{
        padding: '24px 32px',
        maxWidth: '244px',
      }}
    >
      <Typography>마이페이지</Typography>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          // borderRight: 1,
          borderColor: 'divider',
          // padding: '24px 32px',
          gap: '4px',
        }}
        variant="fullWidth"
      >
        <Tab
          label="프로필"
          onClick={() => router.push('/my-page/profile')}
          value={0}
          sx={tabStyle}
        />
        <Tab
          label="관심리스트"
          onClick={() => router.push('/my-page/interests')}
          sx={tabStyle}
          value={1}
        />
        <Tab
          label="쪽지"
          onClick={() => router.push('/my-page/message')}
          sx={tabStyle}
          value={2}
        />
        <Tab
          label="개인정보"
          onClick={() => router.push('/my-page/privacy')}
          sx={tabStyle}
          value={3}
        />
        <Tab
          label="홈페이지 설정"
          onClick={() => router.push('/my-page/homepage-setting')}
          value={4}
          sx={tabStyle}
        />
      </Tabs>
    </Box>
  )
}

export default SubNavBar
