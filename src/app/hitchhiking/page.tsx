'use client'
import { defaultGetFetcher } from '@/api/fetchers'
import { IMainCard } from '@/types/IPostDetail'
import { Container, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import useSWR from 'swr'
import { IPagination } from '@/types/IPagination'
import CardContainer from './panel/CardContainer'

// 1. 메인페이지 api 긁어오기
// 2. 메인 카드 컴포넌트 가져오기
// 3. 틴더 어쩌구 적용

const Hitchhiking = () => {
  const [page, setPage] = useState<number>(1)

  const { data, isLoading, error } = useSWR<IPagination<Array<IMainCard>>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=STUDY&sort=latest&page=${page}&pageSize=2&keyword=&due=1개월&due=12개월 이상&region1=&region2=&place=&status=&tag=`,
    defaultGetFetcher,
  )

  let message: string = ''

  if (isLoading && !data) message = '로딩중'
  else if (error) message = '에러 발생'
  else if (!data?.content) message = '데이터가 없습니다.'

  return (
    <Container sx={{ width: '100% ', height: '90vh', overflow: 'hidden' }}>
      {!message && data?.content ? (
        <CardContainer
          cardList={data.content}
          isLoading={isLoading}
          update={() => setPage((prev) => prev + 1)}
        />
      ) : (
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ width: '90vw', maxWidth: '100%', height: '100%' }}
        >
          <Typography>{message}</Typography>
        </Stack>
      )}
    </Container>
  )
}

export default Hitchhiking
