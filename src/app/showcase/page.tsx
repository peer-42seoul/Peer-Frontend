'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { IPagination } from '@/types/IPagination'
import useMedia from '@/hook/useMedia'
import { Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import { ICardData } from './panel/types'
import useAuthStore from '@/states/useAuthStore'
import CardContainer from './panel/CardContainer'
import ShowcasePCLayout from './panel/ShowcasePc/ShowcasePcLayout'

const Showcase = () => {
  const [page, setPage] = useState<number>(1)
  const [cardList, setCardList] = useState<Array<ICardData>>([])
  const [draggedCardList, setDraggedCardList] = useState<ICardData[]>([])
  const { isPc } = useMedia()
  const { isLogin } = useAuthStore()
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR<IPagination<ICardData[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase?page=${page}&pageSize=10`,
    isLogin
      ? (url: string) => axiosWithAuth.get(url).then((res) => res.data)
      : defaultGetFetcher,
  )

  useEffect(() => {
    if (!isLoading && data?.content) {
      setCardList((prev) => {
        const newArray = [...data.content].reverse().concat(prev)
        return newArray
      })
    }
  }, [isLoading, data?.content])

  const removeCard = (recruit_id: number) => {
    setDraggedCardList((prev: ICardData[]) => {
      prev.push(cardList[cardList.length - 1])
      return prev
    })
    setCardList((prev: ICardData[]) => {
      return prev.filter((card) => card.id !== recruit_id)
    })
    if (cardList.length === 2) {
      setPage((prev) => (!data?.last ? prev + 1 : prev))
    }
  }

  let message: string = ''

  if (!isLoading && !cardList.length) message = '쇼케이스 끝!'
  else if (isLoading && !cardList.length) message = '로딩중'
  else if (error) message = '에러 발생'
  if (isPc) {
    return (
      <Stack
        height={'100%'}
        width={'100vw'}
        direction={'row'}
        justifyContent={'center'}
      >
        <ShowcasePCLayout cardList={cardList} page={page} setPage={setPage} />
      </Stack>
    )
  }
  return (
    <CardContainer
      cardList={cardList}
      removeCard={removeCard}
      message={message}
    />
  )
}

export default Showcase
