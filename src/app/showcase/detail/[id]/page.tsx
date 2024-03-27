'use client'

import { Stack, Typography } from '@mui/material'
import React from 'react'
import ShowcaseViewer from './panel/ShowcaseViewer'
import { IShowcaseViewerFields } from '@/types/IShowcaseEdit'
import CuCircularProgress from '@/components/CuCircularProgress'
import useSWR from 'swr'
import CommentContainer from './panel/CommentContainer'
import useAxiosWithAuth from '@/api/config'

const ShowcaseDetailPage = ({ params }: { params: { id: number } }) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR<IShowcaseViewerFields>(
    `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/${params.id}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
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
      <Stack gap={'2rem'}>
        {/* 쇼케이스 상세 페이지 */}
        <ShowcaseViewer data={data} postId={params.id} />
        {/* 쇼케이스 상세 댓글 */}
        <CommentContainer postId={params.id} />
      </Stack>
    )
  )
}

export default ShowcaseDetailPage
