'use client'
import { defaultGetFetcher } from '@/api/fetchers'

import { FormControlLabel, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { IPagination } from '@/types/IPagination'

import CuToggle from '@/components/CuToggle'
import useMedia from '@/hook/useMedia'
import CardContainer from './panel/CardContainer'
import { ICardData } from '../panel/types'

// 1. 메인페이지 api 긁어오기
// 2. 메인 카드 컴포넌트 가져오기
// 3. 틴더 어쩌구 적용

const Showcase = () => {
  const [page, setPage] = useState<number>(1)
  const [isProject, setIsProject] = useState(true)
  const [cardList, setCardList] = useState<Array<ICardData>>([])

  const { isPc } = useMedia()
  const { data, isLoading, error } = useSWR<IPagination<Array<ICardData>>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=STUDY&sort=latest&page=${page}&pageSize=5&keyword=&due=1개월&due=12개월 이상&region1=&region2=&place=&status=&tag=`,
    defaultGetFetcher,
  )

  useEffect(() => {
    if (!isLoading && data?.content) {
      setCardList((prev) => {
        const newArray = [...data.content].reverse().concat(prev)
        return newArray
      })
    }
  }, [isLoading, data?.content])

  let message: string = ''

  if (isLoading && !cardList.length) message = '로딩중'
  else if (error) message = '에러 발생'

  return (
    <Stack
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{ width: '100%', height: '80svh' }}
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
          width: isPc ? '20.5rem' : '92vw',
          height: '27rem',
          maxWidth: '20.5rem',
          position: 'relative',
        }}
      >
        {!message ? (
          <CardContainer
            cardList={cardList}
            isLoading={isLoading}
            update={() => setPage((prev) => (!data?.last ? prev + 1 : prev))}
            setCardList={setCardList}
          />
        ) : (
          <Typography>{message}</Typography>
        )}
      </Stack>
      <Typography variant="Title3Emphasis">관심있어요!</Typography>
    </Stack>
  )
}

export default Showcase
