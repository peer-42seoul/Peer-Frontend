'use client'
import { defaultGetFetcher } from '@/api/fetchers'
import { IMainCard } from '@/types/IPostDetail'
import { FormControlLabel, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import useSWR from 'swr'
import { IPagination } from '@/types/IPagination'
import CardContainer from './panel/CardContainer'
import CuToggle from '@/components/CuToggle'

// 1. 메인페이지 api 긁어오기
// 2. 메인 카드 컴포넌트 가져오기
// 3. 틴더 어쩌구 적용

const Hitchhiking = () => {
  const [page, setPage] = useState<number>(1)
  const [isProject, setIsProject] = useState(true)

  const { data, isLoading, error } = useSWR<IPagination<Array<IMainCard>>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=STUDY&sort=latest&page=${page}&pageSize=2&keyword=&due=1개월&due=12개월 이상&region1=&region2=&place=&status=&tag=`,
    defaultGetFetcher,
  )

  let message: string = ''

  if (isLoading && !data) message = '로딩중'
  else if (error) message = '에러 발생'
  else if (!data?.content) message = '데이터가 없습니다.'

  return (
    <Stack
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{ width: '100vw', height: '80vh' }}
      direction={'column'}
    >
      <FormControlLabel
        control={
          <CuToggle
            checked={isProject}
            onChange={() => setIsProject((prev) => !prev)}
          />
        }
        label="Label"
      />
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          width: '100vw',
          height: '70vh',
          overflow: 'hidden',
          position: 'absolute',
          top: '10vh',
          left: 0,
        }}
      >
        {!message && data?.content ? (
          <CardContainer
            cardList={data.content}
            isLoading={isLoading}
            update={() => setPage((prev) => prev + 1)}
          />
        ) : (
          <Typography>{message}</Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default Hitchhiking
