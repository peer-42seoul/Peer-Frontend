'use client'
import useMedia from '@/hook/useMedia'
import { Box, SxProps, Tab, Tabs, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const getTabValue = (path: string) => {
  if (path.startsWith('/my-page')) return 1
  else if (path.startsWith('/my-page/interests')) return 2
  else if (path.startsWith('/my-page/message')) return 3
  else if (path.startsWith('/my-page/privacy')) return 4
  else if (path.startsWith('/my-page/homepage-setting')) return 5
  else return 0
}

const SubNavBar = () => {
  const router = useRouter()
  console.log(router)
  const pathName = usePathname()
  console.log(pathName)
  const [value, setValue] = useState(0)
  const { isPc } = useMedia()

  const tabStyle: SxProps = { maxWidth: '244px', padding: '0 24px' }

  useEffect(() => {
    setValue(getTabValue(pathName))
  }, [pathName])

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
          sx={tabStyle}
          value={4}
        />
      </Tabs>
    </Box>
  )
}

export default SubNavBar
