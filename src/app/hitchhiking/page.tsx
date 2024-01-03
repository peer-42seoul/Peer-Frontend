'use client'
import { defaultGetFetcher } from '@/api/fetchers'
import { IMainCard } from '@/types/IPostDetail'
import { FormControlLabel, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { IPagination } from '@/types/IPagination'
import CardContainer from './panel/CardContainer'
import CuTypeToggle from '@/components/CuTypeToggle'
import useMedia from '@/hook/useMedia'
import Interest from './panel/Interest'
import CuButton from '@/components/CuButton'
import * as style from './panel/HitchhikingCard.style'

const Hitchhiking = () => {
  const [page, setPage] = useState<number>(1)
  const [isProject, setIsProject] = useState(false)
  const [cardList, setCardList] = useState<Array<IMainCard>>([])
  const [draggedCardList, setDraggedCardList] = useState<IMainCard[]>([])

  const { isPc } = useMedia()
  const { data, isLoading, error } = useSWR<IPagination<Array<IMainCard>>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=${
      isProject ? 'PROJECT' : 'STUDY'
    }&sort=latest&page=${page}&pageSize=3&keyword=&due=1개월&due=12개월 이상&region1=&region2=&place=&status=&tag=`,
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
    console.log('cardList.length')
    console.log(cardList.length)
    console.log('cardList')
    console.log(cardList)
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

  return (
    <Stack
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{
        width: '100%',
        height: isPc ? '90svh' : '80svh',
        overflow: 'hidden',
        bottom: 0,
      }}
      direction={'column'}
    >
      <Stack
        sx={{ width: '100%' }}
        justifyContent={'center'}
        alignItems={'center'}
        direction={'row'}
        spacing={'0.5rem'}
      >
        <Typography
          variant="Caption"
          color={!isProject ? 'purple.normal' : 'text.assistive'}
          sx={{ transition: 'color 0.5s ease' }}
        >
          스터디
        </Typography>
        <FormControlLabel
          control={<CuTypeToggle checked={isProject} onChange={handleChange} />}
          label={''}
        />
        <Typography
          variant="Caption"
          color={isProject ? 'purple.normal' : 'text.assistive'}
          sx={{ transition: 'color 0.5s ease' }}
        >
          프로젝트
        </Typography>
      </Stack>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          ...(isPc ? style.cardPcSize : style.cardMobileSize),
          position: 'relative',
        }}
      >
        {!message ? (
          <CardContainer
            cardList={cardList}
            removeCard={removeCard}
            isProject={isProject}
          />
        ) : (
          <Typography>{message}</Typography>
        )}
      </Stack>
      {/* <CuButton
          message="되돌리기"
          action={addCard}
          disabled={!draggedCardList.length}
        /> */}
      <Interest id={cardList[cardList.length - 1]?.recruit_id} />
      {/* <CuButton
          message="관심없음"
          action={() => removeCard(cardList[cardList.length - 1]?.recruit_id)}
        /> */}
    </Stack>
  )
}

export default Hitchhiking
