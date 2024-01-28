'use client'

import { Typography } from '@mui/material'
import React from 'react'
import ShowcaseViewer from './panel/ShowcaseViewer'
import { IShowcaseViewerFields } from '@/types/IShowcaseEdit'
import CuCircularProgress from '@/components/CuCircularProgress'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'

const ShowcaseDetailPage = ({ params }: { params: { id: number } }) => {
  const { data, isLoading, error } = useSWR<IShowcaseViewerFields>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/${params.id}`,
    defaultGetFetcher,
    { shouldRetryOnError: false },
  )

  if (!data) return <CuCircularProgress color={'secondary'} />
  if (isLoading) return <CuCircularProgress color={'secondary'} />
  if (error)
    return <Typography color={'error'}>에러가 발생했습니다.</Typography>

  return <ShowcaseViewer data={data} />
}

export default ShowcaseDetailPage
