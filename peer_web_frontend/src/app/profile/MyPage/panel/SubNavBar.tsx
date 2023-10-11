'use client'
import useMedia from '@/hook/useMedia'
import { Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SubNavBar = () => {
  const router = useRouter()
  const [value, setValue] = useState(0)
  const { isPc } = useMedia()

  if (!isPc) {
    console.log(isPc)
    return <div></div>
  }

  return (
    <div>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{ borderRight: 1, borderColor: 'divider' }}
        variant="fullWidth"
      >
        <Tab
          label="프로필"
          onClick={() => {
            router.push('/profile/MyPage')
          }}
        />
        <Tab
          label="관심리스트"
          onClick={() => {
            router.push('/')
          }}
        />
        <Tab
          label="쪽지"
          onClick={() => {
            router.push('/')
          }}
        />
        <Tab
          label="개인정보"
          onClick={() => {
            router.push('/')
          }}
        />
        <Tab
          label="홈페이지 설정"
          onClick={() => {
            router.push('/')
          }}
        />
      </Tabs>
    </div>
  )
}

export default SubNavBar
