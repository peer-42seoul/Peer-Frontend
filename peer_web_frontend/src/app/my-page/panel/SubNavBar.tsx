'use client'
import useMedia from '@/hook/useMedia'
import { Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'

const getTabValue = (path: string) => {
  switch (path) {
    case '/my-page/profile':
      return '프로필'

    case '/my-page/interests':
      return '관심리스트'

    case '/my-page/messages':
      return '쪽지'

    case '/my-page/privacy':
      return '개인정보'

    case 'my-page/homepage-setting':
      return '홈페이지 설정'

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

  if (!isPc) {
    return <div></div>
  }

  return (
    <div>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
        }}
        variant="fullWidth"
      >
        <Tab
          label="프로필"
          onClick={() => {
            router.push('/my-page/profile')
          }}
        />
        <Tab
          label="관심리스트"
          onClick={() => {
            router.push('/my-page/interests')
          }}
        />
        <Tab
          label="쪽지"
          onClick={() => {
            router.push('/my-page/message')
          }}
        />
        <Tab
          label="개인정보"
          onClick={() => {
            router.push('/my-page/privacy')
          }}
        />
        <Tab
          label="홈페이지 설정"
          onClick={() => {
            router.push('/my-page/homepage-setting')
          }}
        />
      </Tabs>
    </div>
  )
}

export default SubNavBar
