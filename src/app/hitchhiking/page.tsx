'use client'
import { defaultGetFetcher } from '@/api/fetchers'
import { IMainCard } from '@/types/IPostDetail'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { IPagination } from '@/types/IPagination'
import useMedia from '@/hook/useMedia'
import { Box, IconButton, Stack } from '@mui/material'
import CardContainer from './panel/CardContainer'
import ArrowUp from '@/icons/ArrowUp'
// import CuButton from '@/components/CuButton'
import * as style from './hitchhiking.style'
import ArrowDown from '@/icons/ArrowDown'

const Hitchhiking = () => {
  const [page, setPage] = useState<number>(1)
  const [isProject, setIsProject] = useState(false)
  const [cardList, setCardList] = useState<Array<IMainCard>>([])
  const [draggedCardList, setDraggedCardList] = useState<IMainCard[]>([])

  const { isPc } = useMedia()
  const { data, isLoading, error } = useSWR<IPagination<Array<IMainCard>>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=${
      isProject ? 'PROJECT' : 'STUDY'
    }&sort=latest&page=${page}&pageSize=5&keyword=&due=1개월&due=12개월 이상&region1=&region2=&place=&status=&tag=`,
    defaultGetFetcher,
  )

  const handleChange = () => {
    setCardList([])
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
    setDraggedCardList((prev: IMainCard[]) => {
      prev.push(cardList[cardList.length - 1])
      return prev
    })
    setCardList((prev: IMainCard[]) => {
      return prev.filter((card) => card.recruit_id !== recruit_id)
    })
    if (cardList.length === 2) {
      setPage((prev) => (!data?.last ? prev + 1 : prev))
    }
  }

  const addCard = () => {
    setCardList((prev: IMainCard[]) => {
      return [...prev, draggedCardList[0]]
    })
    setDraggedCardList((prev: IMainCard[]) => {
      return prev.filter(
        (card) => card.recruit_id !== draggedCardList[0].recruit_id,
      )
    })
  }

  let message: string = ''

  if (!isLoading && !cardList.length) message = '히치하이킹 끝!'
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
            onClick={() =>
              removeCard(cardList[cardList.length - 1]?.recruit_id)
            }
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
