'use client'
import useMedia from '@/hook/useMedia'
import { MenuItem, Tab, Tabs } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import React from 'react'

const TypeToggle = ({
  type,
  handleChange,
}: {
  type: string
  handleChange: (e: SelectChangeEvent) => void
}) => {
  return (
    <Select value={type} onChange={handleChange} variant="standard">
      <MenuItem value={'project'}>프로젝트</MenuItem>
      <MenuItem value={'study'}>스터디</MenuItem>
      {/* <MenuItem value={'showcase'}>쇼케이스</MenuItem> 2step */}
    </Select>
  )
}

const TypeTabs = ({
  type,
  handleChange,
}: {
  type: string
  handleChange: (e: React.SyntheticEvent, newValue: string) => void
}) => {
  return (
    <Tabs
      value={type}
      onChange={handleChange}
      aria-label="basic tabs example"
      variant="fullWidth"
    >
      <Tab label="프로젝트" value={'project'} />
      <Tab label="스터디" value={'study'} />
      {/* <Tab label="쇼케이스" value={'showcase'} /> */}
    </Tabs>
  )
}

const MyInterests = () => {
  const { isPc } = useMedia()
  const [type, setType] = React.useState('project')

  const handleSelectChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setType(newValue)
  }

  return (
    <div>
      {isPc ? (
        <TypeToggle type={type} handleChange={handleSelectChange} />
      ) : (
        <TypeTabs type={type} handleChange={handleTabChange} />
      )}
    </div>
  )
}

export default MyInterests
