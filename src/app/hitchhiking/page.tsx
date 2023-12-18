'use client'
import { defaultGetFetcher } from '@/api/fetchers'
import { IMainCard } from '@/types/IPostDetail'
import { FormControlLabel, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { IPagination } from '@/types/IPagination'
import CardContainer from './panel/CardContainer'
import CuToggle from '@/components/CuToggle'
import useMedia from '@/hook/useMedia'
import Interest from './panel/Interest'

const Hitchhiking = () => {
  const [page, setPage] = useState<number>(1)
  const [isProject, setIsProject] = useState(false)
  const [cardList, setCardList] = useState<Array<IMainCard>>([])

  const { isPc } = useMedia()
  const { data, isLoading, error } = useSWR<IPagination<Array<IMainCard>>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=${
      isProject ? 'PROJECT' : 'STUDY'
    }&sort=latest&page=${page}&pageSize=5&keyword=&due=1개월&due=12개월 이상&region1=&region2=&place=&status=&tag=`,
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
      sx={{ width: '100%', height: '80svh', overflow: 'hidden' }}
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
          width: isPc ? '20.5rem' : '93vw',
          height: '27rem',
          maxWidth: '20.5rem',
          position: 'relative',
        }}
      >
        {!message ? (
          <CardContainer
            cardList={cardList}
            update={() => setPage((prev) => (!data?.last ? prev + 1 : prev))}
            setCardList={setCardList}
            isProject={isProject}
          />
        ) : (
          <Typography>{message}</Typography>
        )}
      </Stack>
      {/* {cardList.length && ( */}
      <Interest id={cardList[cardList.length - 1]?.recruit_id} />
      {/* )} */}
    </Stack>
  )
}

export default Hitchhiking
