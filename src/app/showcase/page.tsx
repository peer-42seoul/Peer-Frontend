'use client'
import { defaultGetFetcher } from '@/api/fetchers'

import { FormControlLabel, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { IPagination } from '@/types/IPagination'
import useMedia from '@/hook/useMedia'
import CardContainer from './panel_refac/CardContainer'
import { ICardData } from './panel/types'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'
import { AxiosInstance } from 'axios'

// 1. 메인페이지 api 긁어오기
// 2. 메인 카드 컴포넌트 가져오기
// 3. 틴더 어쩌구 적용

const Showcase = () => {
  const [page, setPage] = useState<number>(1)
  const { isLogin } = useAuthStore()
  const [cardList, setCardList] = useState<Array<ICardData>>([])
  const axiosInstance: AxiosInstance = useAxiosWithAuth()
  const { isPc } = useMedia()
  const { data, error, isLoading } = useSWR<IPagination<ICardData[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase?page=${page}&pageSize=10`,
    isLogin
      ? (url: string) => axiosInstance.get(url).then((res) => res.data)
      : defaultGetFetcher,
  )

  console.log(data)

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
    </Stack>
  )
}

export default Showcase
