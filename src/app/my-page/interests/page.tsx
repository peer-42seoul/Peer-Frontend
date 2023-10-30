'use client'
import { defaultGetFetcher } from '@/api/fetchers'
import { ProjectType } from '@/app/page'
import MainCard from '@/app/panel/MainCard'
import useMedia from '@/hook/useMedia'
import { IPost } from '@/types/IPostDetail'
import { Grid, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import React, { useCallback } from 'react'
import useSWR from 'swr'

const MyInterests = () => {
  const { isPc } = useMedia()
  const [type, setType] = React.useState('projects')

  const handleSelectChange = (event: SelectChangeEvent) => {
    console.log('event.target.value as string : ', event.target.value as string)
    setType(event.target.value as string)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log('newValue: ', newValue)
    console.log('11', event.currentTarget, event.target)
    setType(newValue as string)
  }

  const { data, isLoading } = useSWR<Array<IPost>>(
    `${process.env.NEXT_PUBLIC_API_URL}/${type}-sort-recent`,
    defaultGetFetcher,
  )

  const TypeToggle = useCallback(
    ({
      type,
      handleChange,
    }: {
      type: string
      handleChange: (e: SelectChangeEvent) => void
    }) => {
      console.log('dropdown', type)
      return (
        <Select value={type} onChange={handleChange} variant="standard">
          <MenuItem value={'projects'}>프로젝트</MenuItem>
          <MenuItem value={'studies'}>스터디</MenuItem>
          {/* <MenuItem value={'showcase'}>쇼케이스</MenuItem> 2step */}
        </Select>
      )
    },
    [type],
  )

  const TypeTabs = useCallback(
    ({
      type,
      handleChange,
    }: {
      type: string
      handleChange: (e: React.SyntheticEvent, newValue: string) => void
    }) => {
      console.log('tab', type)

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
    },
    [type],
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
          <Grid item key={item.post_id} xs={10} sm={4}>
            <MainCard {...item} type={type as ProjectType} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default MyInterests
