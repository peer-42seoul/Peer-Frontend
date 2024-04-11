import { Stack, Typography } from '@mui/material'
import React from 'react'
import ShowcaseViewer from './panel/ShowcaseViewer'
import CommentContainer from './panel/CommentContainer'
import axios from 'axios'

const ShowcaseDetailPage = async ({ params }: { params: any }) => {
  const data = await axios
    .get(`${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/${params.id}`)
    .then((res) => res.data)

  if (!data) {
    return <Typography color={'error'}>에러가 발생했습니다.</Typography>
  }
  return (
    data && (
      <Stack component={'main'} gap={'2rem'}>
        {/* 쇼케이스 상세 페이지 */}
        <ShowcaseViewer data={data} postId={params.id} />
        {/* 쇼케이스 상세 댓글 */}
        <CommentContainer postId={params.id} />
      </Stack>
    )
  )
}

export default ShowcaseDetailPage
