'use client'

import { Stack, Typography } from '@mui/material'
import React from 'react'
import ShowcaseEditor from '../panel/ShowcaseEditor'
import { IShowcaseData } from '@/types/IShowcaseEdit'
import useAxiosWithAuth from '@/api/config'
import useSWR from 'swr'
import CuCircularProgress from '@/components/CuCircularProgress'

/*
  계획
    - 모바일
      device detect(브라우저 헤더로 기기 판단하는 라이브러리)로 모바일 처리, 모바일에서는 접근 불가능한 페이지임
    - 데스크탑
      1. 폼 컴포넌트 배치
      2. 버튼 배치
*/

const ShowCaseEditPage = () => {
  const showcaseId = 16
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR<IShowcaseData>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/${showcaseId}`,
    // defaultGetFetcher,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
    { shouldRetryOnError: false },
  )

  if (!data?.author) {
    return <Typography color={'error'}>잘못된 접근입니다.</Typography>
  }
  if (isLoading) return <CuCircularProgress color={'secondary'} />
  if (error)
    return <Typography color={'error'}>에러가 발생했습니다.</Typography>

  return (
    <Stack direction={'column'} sx={{ overflow: 'auto' }}>
      {data && (
        <ShowcaseEditor
          data={data}
          teamId={showcaseId}
          requestMethodType={'put'}
          router={null}
        />
      )}
    </Stack>
  )
}

export default ShowCaseEditPage
