'use client'

import { useEffect, useState } from 'react'
import { Tabs, Tab, Stack } from '@mui/material'
import Announce from './announce/Announce'
import Tag from './tag/Tag'
import Banner from './banner/Banner'
import useAdminStore from '@/states/useAdminStore'
import { useRouter } from 'next/navigation'
const AdminLayout = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const { isLoggedIn } = useAdminStore()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn === false) {
      alert('로그인이 필요한 서비스입니다.')
      router.push('/admin/login')
    }
  }, [isLoggedIn])

  return (
    <Stack direction={'row'}>
      <Tabs
        value={value}
        orientation="vertical"
        onChange={handleChange}
        aria-label="admin tabs"
      >
        <Tab label="Announce" />
        <Tab label="Tag" />
        <Tab label="Banner" />
      </Tabs>
      {value === 0 && <Announce />}
      {value === 1 && <Tag />}
      {value === 2 && <Banner />}
    </Stack>
  )
}

export default AdminLayout
