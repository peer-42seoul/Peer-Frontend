'use client'

import { Stack, Typography } from '@mui/material'
import React from 'react'
import ShowcaseViewer from './panel/ShowcaseViewer'
import { IShowcaseViewerFields } from '@/types/IShowcaseEdit'
import CuCircularProgress from '@/components/CuCircularProgress'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
// import useAxiosWithAuth from '@/api/config'

const ShowcaseDetailPage = () => {
  // const mockData: IShowcaseEditorFields = {
  //   title: '42peer',
  //   skills: [
  //     {
  //       name: 'Javascript',
  //       Id: 1,
  //       color: '#F0DB4F',
  //     },
  //     {
  //       name: 'React',
  //       Id: 2,
  //       color: '#61DBFB',
  //     },
  //     {
  //       name: 'Python',
  //       Id: 3,
  //       color: '#3776AB',
  //     },
  //   ],
  //   start: '2024-01-01',
  //   end: '2024-12-31',
  //   member: [
  //     {
  //       nickname: '홍길동',
  //       role: '프론트엔드 개발자',
  //       image: '',
  //       isLeader: false,
  //     },
  //     { nickname: '이순신', role: '백엔드 개발자', image: '', isLeader: false },
  //     { nickname: '이순신', role: '리더', image: '', isLeader: false },
  //   ],
  //   links: [
  //     { linkName: '네이버', linkUrl: 'http://www.naver.com', id: 0 },
  //     { linkName: '깃허브', linkUrl: 'http://www.github.com', id: 1 },
  //   ],
  //   content: '안녕하세요 **42서울** ##1기입니다. ```json id : 42``` ',
  // }

  // const data = 0

  const showcaseId = 3
  // const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR<IShowcaseViewerFields>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/${showcaseId}`,
    defaultGetFetcher,
    // (url: string) => axiosWithAuth.get(url).then((res) => res.data),
    { shouldRetryOnError: false },
  )

  if (!data) return <CuCircularProgress color={'secondary'} />
  if (isLoading) return <CuCircularProgress color={'secondary'} />
  if (error)
    return <Typography color={'error'}>에러가 발생했습니다.</Typography>

  return (
    <Stack>
      <ShowcaseViewer data={data} />
    </Stack>
  )
}

export default ShowcaseDetailPage
