'use client'
import { defaultGetFetcher } from '@/api/fetchers'
import { IMainCard } from '@/types/IPostDetail'
import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import useSWR from 'swr'
import { IPagination } from '@/types/IPagination'
import CardContainer from './panel/CardContainer'

// 1. 메인페이지 api 긁어오기
// 2. 메인 카드 컴포넌트 가져오기
// 3. 틴더 어쩌구 적용

const Hitchhiking = () => {
  const [page, setPage] = useState<number>(1)
  const [cardList, setCardList] = useState<Array<IMainCard>>([])

  const { data, isLoading, error } = useSWR<IPagination<Array<IMainCard>>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=STUDY&sort=latest&page=${page}&pageSize=5&keyword=&due=1개월&due=12개월 이상&region1=&region2=&place=&status=&tag=`,
    defaultGetFetcher,
  )

  if (isLoading && !data)
    return <Typography variant="Title3Emphasis">로딩중</Typography>
  if (error) return <Typography variant="Title3Emphasis">에러</Typography>
  if (!data || !data?.content)
    return <Typography variant="Title3Emphasis">데이터가 없습니다.</Typography>

  return (
    <Box width={1} height={'90vh'}>
      <CardContainer
        cardList={data.content}
        isLoading={isLoading}
        update={() => setPage((prev) => prev + 1)}
      />
    </Box>
  )
}

export default Hitchhiking
