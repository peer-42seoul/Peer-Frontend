'use client'
import { IPostCardHitchhiking } from '@/types/IPostCard'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { IPagination } from '@/types/IPagination'
import useMedia from '@/hook/useMedia'
import { Box, IconButton, Stack } from '@mui/material'
import CardContainer from './panel/CardContainer'
import ArrowUp from '@/icons/ArrowUp'
import * as style from './hitchhiking.style'
import ArrowDown from '@/icons/ArrowDown'
import useAxiosWithAuth from '@/api/config'
import { getUniqueArray } from '@/utils/getUniqueArray'

const Hitchhiking = () => {
  const [page, setPage] = useState<number>(1)
  const [isProject, setIsProject] = useState(false)
  const [cardList, setCardList] = useState<Array<IPostCardHitchhiking>>([])
  const [draggedCardList, setDraggedCardList] = useState<
    IPostCardHitchhiking[]
  >([])

  const axiosWithAuth = useAxiosWithAuth()

  const { isPc } = useMedia()
  const { data, isLoading, error } = useSWR<
    IPagination<Array<IPostCardHitchhiking>>
  >(
    `${
      process.env.NEXT_PUBLIC_CSR_API
    }/api/v1/hitch?page=${page}&pageSize=5&type=${
      isProject ? 'PROJECT' : 'STUDY'
    }`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
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
        return getUniqueArray(newArray, 'recruitId')
      })
    }
  }, [isLoading, data?.content])

  const removeCard = (recruitId: number) => {
    setDraggedCardList((prev: IPostCardHitchhiking[]) => {
      prev.push(cardList[cardList.length - 1])
      return prev
    })
    draggedCardList[draggedCardList.length - 1].hasBeenRemoved = true
    setCardList((prev: IPostCardHitchhiking[]) => {
      return prev.filter((card) => card.recruitId !== recruitId)
    })
    if (cardList.length === 2) {
      setPage((prev) => (!data?.last ? prev + 1 : prev))
    }
  }

  const addCard = () => {
    if (draggedCardList.length === 0) return
    setCardList((prev: IPostCardHitchhiking[]) => {
      prev.push(draggedCardList[draggedCardList.length - 1])
      if (cardList.length > 1) prev[prev.length - 2].hasBeenRemoved = false
      return prev
    })
    setDraggedCardList((prev: IPostCardHitchhiking[]) => {
      return prev.filter(
        (card) =>
          card.recruitId !==
          draggedCardList[draggedCardList.length - 1].recruitId,
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
            setCardList={setCardList}
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
            onClick={() => removeCard(cardList[cardList.length - 1]?.recruitId)}
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
      addCard={addCard}
      removeCard={removeCard}
      isProject={isProject}
      message={message}
      handleChange={handleChange}
      addDisabled={draggedCardList.length === 0}
      setCardList={setCardList}
    />
  )
}

export default Hitchhiking
