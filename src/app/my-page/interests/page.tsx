'use client'
import { defaultGetFetcher } from '@/api/fetchers'
import { ProjectType } from '@/app/page'
import MainCard from '@/app/panel/MainCard'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
import useMedia from '@/hook/useMedia'
import { Tag } from '@/types/IPostDetail'
import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

interface IMainCard {
  title: string
  image: string
  user_id: string
  user_nickname: string
  user_thumbnail: string
  status: string
  tagList: Tag[]
  isFavorite: boolean
  post_id: string
  type: ProjectType
}

interface IInterestResponse {
  postList: IMainCard[]
  isLast: boolean
}

const MyInterests = () => {
  const { isPc } = useMedia()
  const [type, setType] = useState('projects')
  const [page, setPage] = useState<number>(1)
  const [pageLimit, setPageLimit] = useState<number>(1)
  const [postList, setPostList] = useState<Array<IMainCard>>(
    [] as Array<IMainCard>,
  )

  const handleSelectChange = (event: SelectChangeEvent) => {
    console.log('event.target.value as string : ', event.target.value as string)
    setType(event.target.value as string)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log('newValue: ', newValue)
    console.log('11', event.currentTarget, event.target)
    setType(newValue as string)
  }

  // TODO 토큰 있는 fetcher로 바꾸기
  const { data, isLoading, mutate } = useSWR<IInterestResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/favorite?type=${type}&page=${page}&pagesize=10`,
    defaultGetFetcher,
  )

  useEffect(() => {
    if (!isLoading && data && !data.isLast) {
      setPostList((prev) => prev.concat(data.postList))
      setPageLimit((prev) => prev + 1)
    }
  }, [isLoading, data])

  const { target, spinner } = useInfiniteScroll({
    setPage,
    mutate,
    pageLimit,
    page,
  })

  const TypeToggle = ({
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
  }

  const TypeTabs = ({
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
  }

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
        {postList.map((item) => (
          <Grid item key={item.post_id} xs={10} sm={4}>
            <MainCard {...item} />
          </Grid>
        ))}
        <Grid item xs={10} sm={4}>
          <Box ref={target}></Box>
        </Grid>
      </Grid>
      {spinner && <CircularProgress />}
    </div>
  )
}

export default MyInterests
