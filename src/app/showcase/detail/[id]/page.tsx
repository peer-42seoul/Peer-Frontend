'use client'

import { Typography } from '@mui/material'
import React from 'react'
import ShowcaseViewer from './panel/ShowcaseViewer'
import { IShowcaseViewerFields } from '@/types/IShowcaseEdit'
import CuCircularProgress from '@/components/CuCircularProgress'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
import CommentContainer from './panel/CommentContainer'

const ShowcaseDetailPage = ({ params }: { params: { id: number } }) => {
  const { data, isLoading, error } = useSWR<IShowcaseViewerFields>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/${params.id}`,
    defaultGetFetcher,
    { shouldRetryOnError: false },
  )
  if (isLoading) return <CuCircularProgress color={'secondary'} />
  if (error) {
    if (error.response && error.response.status === 404) {
      return (
        <Typography color={'error'}>{error.response.data.message}</Typography>
      )
    }
    return <Typography color={'error'}>에러가 발생했습니다.</Typography>
  }

  return (
    data && (
      <>
        <ShowcaseViewer data={data} postId={params.id} />
        <CommentContainer postId={params.id} />
      </>
    )
  )
}

export default ShowcaseDetailPage
