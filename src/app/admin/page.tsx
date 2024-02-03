'use client'

import { useEffect, useState } from 'react'
import { Tabs, Tab, Stack } from '@mui/material'
import Announce from './announce/page'
import Tag from './tag/page'
const AdminLayout = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

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
      </Tabs>
      {value === 0 && <Announce />}
      {value === 1 && <Tag />}
    </Stack>
  )
}

export default AdminLayout
