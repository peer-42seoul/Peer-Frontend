'use client'

import { useState } from 'react'
import { Tabs, Tab, Stack } from '@mui/material'
import Announces from './announce/Announces'
import Tag from './tag/Tag'
import Banner from './banner/Banner'
import useAdminStore from '@/states/useAdminStore'
import LoginForm from './login/LoginForm'
const AdminLayout = () => {
  const [value, setValue] = useState(0)
  const { isLoggedIn } = useAdminStore()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Stack direction={'row'}>
      {isLoggedIn === false ? (
        <LoginForm />
      ) : (
        <Stack direction={'row'}>
          <Tabs
            value={value}
            orientation="vertical"
            onChange={handleChange}
            aria-label="admin tabs"
          >
            <Tab label="Announce" />
            <Tab label="Banner" />
            <Tab label="Tag" />
          </Tabs>
          {value === 0 && <Announces />}
          {value === 1 && <Banner />}
          {value === 2 && <Tag />}
        </Stack>
      )}
    </Stack>
  )
}

export default AdminLayout
