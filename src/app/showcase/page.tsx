'use client'

import { defaultGetFetcher } from '@/api/fetchers'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { IPagination } from '@/types/IPagination'
import useMedia from '@/hook/useMedia'
import { Box, IconButton, Stack } from '@mui/material'
import CardContainer from './panel/CardContainer'
import ArrowUp from '@/icons/ArrowUp'
// import CuButton from '@/components/CuButton'
import * as style from './showcase.style'
import ArrowDown from '@/icons/ArrowDown'
import useAxiosWithAuth from '@/api/config'
import { ICardData } from '../showcase/panel/types'
import useAuthStore from '@/states/useAuthStore'

const Hitchhiking = () => {
  const [page, setPage] = useState<number>(1)
  const [isProject, setIsProject] = useState(false)
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

  const handleChange = () => {
    setCardList([])
    setDraggedCardList([])
    setPage(1)
    setIsProject((prev) => !prev)
  }

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

  const addCard = () => {
    setCardList((prev: ICardData[]) => {
      prev.push(draggedCardList[draggedCardList.length - 1])
      return prev
    })
    setDraggedCardList((prev: ICardData[]) => {
      return prev.filter(
        (card) => card.id !== draggedCardList[draggedCardList.length - 1].id,
      )
    })
  }

  let message: string = ''

  if (!isLoading && !cardList.length) message = '쇼케이스 끝!'
  else if (isLoading && !cardList.length) message = '로딩중'
  else if (error) message = '에러 발생'

  if (isPc) {
    return (
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'end'}
        spacing={'1.5rem'}
      >
        <Box sx={style.buttonContainerStyle}></Box>
        <Box sx={style.phoneStyle}>
          <Box sx={style.phoneStatusBarStyle} />
          <CardContainer
            cardList={cardList}
            removeCard={removeCard}
            isProject={isProject}
            message={message}
            handleChange={handleChange}
          />
        </Box>
        <Stack
          sx={style.buttonContainerStyle}
          direction={'column'}
          justifyContent={'flex-end'}
          spacing={'1rem'}
        >
          <IconButton
            sx={style.buttonStyle}
            onClick={addCard}
            disabled={draggedCardList.length === 0}
          >
            <ArrowUp
              sx={{ ...style.buttonIconStyle, color: 'text.alternative' }}
            />
          </IconButton>
          <IconButton
            sx={style.buttonStyle}
            onClick={() => removeCard(cardList[cardList.length - 1]?.id)}
            disabled={cardList.length === 0}
          >
            <ArrowDown
              sx={{ ...style.buttonIconStyle, color: 'text.alternative' }}
            />
          </IconButton>
        </Stack>
      </Stack>
    )
  }
  return (
    <CardContainer
      cardList={cardList}
      removeCard={removeCard}
      isProject={isProject}
      message={message}
      handleChange={handleChange}
    />
  )
}

export default Hitchhiking
