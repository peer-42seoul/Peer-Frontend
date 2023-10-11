'use client'
import { defaultGetFetcher } from '@/api/fetchers'
import MainCard from '@/app/panel/MainCard'
import useMedia from '@/hook/useMedia'
import { IProject } from '@/types/IProejct'
import { Grid, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import React, { useEffect } from 'react'
import useSWR from 'swr'

const TypeToggle = ({
  type,
  handleChange,
}: {
  type: string
  handleChange: (e: SelectChangeEvent) => void
}) => {
  // console.log('dropdown', type)
  return (
    <Select value={type} onChange={handleChange} variant="standard">
      <MenuItem value={'projects'}>프로젝트</MenuItem>
      <MenuItem value={'studies'}>스터디</MenuItem>
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
  // console.log('tab', type)

  return (
    <Tabs
      value={type}
      onChange={handleChange}
      aria-label="menu tabs"
      variant="fullWidth"
    >
      <Tab label="프로젝트" value={'projects'} />
      <Tab label="스터디" value={'studies'} />
      {/* <Tab label="쇼케이스" value={'showcase'} /> */}
    </Tabs>
  )
}

const MyInterests = () => {
  const { isPc } = useMedia()
  const [type, setType] = React.useState('projects')

  useEffect(() => {
    console.log(type)
  }, [isPc, type])

  const handleSelectChange = (event: SelectChangeEvent) => {
    console.log('event.target.value as string : ', event.target.value as string)
    setType(event.target.value as string)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log('newValue: ', newValue)
    setType(newValue)
  }

  const { data, isLoading } = useSWR<Array<IProject>>(
    `https://27366dd1-6e95-4ec6-90c2-062a85a79dfe.mock.pstmn.io/${type}-sort-recent`,
    defaultGetFetcher,
  )

  if (isLoading) return <Typography>로딩중 입니다.</Typography>
  if (!data) return <Typography>데이터가 없습니다.</Typography>
  return (
    <div>
      {isPc ? (
        <TypeToggle type={type} handleChange={handleSelectChange} />
      ) : (
        <TypeTabs type={type} handleChange={handleTabChange} />
      )}
      <Grid
        container
        spacing={[0, 2]}
        alignItems="center"
        justifyContent={['space-evenly', 'flex-start']}
        sx={{ width: '100%' }}
        direction="row"
      >
        {data.map((item) => (
          <Grid item key={item.id} xs={10} sm={4}>
            <MainCard {...item} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default MyInterests
