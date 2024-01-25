'use client'

import { Stack, Typography } from '@mui/material'
import React from 'react'
import ShowcaseViewer from './panel/ShowcaseViewer'
import { IShowcaseViewerFields } from '@/types/IShowcaseEdit'
import CuCircularProgress from '@/components/CuCircularProgress'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'

const ShowcaseDetailPage = () => {
  const showcaseId = 16
  // const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR<IShowcaseViewerFields>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/${showcaseId}`,
    defaultGetFetcher,
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
