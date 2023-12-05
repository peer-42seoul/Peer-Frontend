'use client'

import { IconButton, Stack, Typography } from '@mui/material'
import ShowcaseCard from './panel/ShowcaseCard'
import { TouchEvent, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PhoneFrame from './panel/PhoneFrame'
import useMedia from '@/hook/useMedia'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useSWR from 'swr'
import { ICardData } from './panel/types'
import { defaultGetFetcher } from '@/api/fetchers'
import { IPagination } from '@/types/IPagination'
import useAuthStore from '@/states/useAuthStore'
import useAxiosWithAuth from '@/api/config'

const ShowcasePage = () => {
  const [page, setPage] = useState<number>(1)
  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const constraintsRef = useRef(null)
  const { isPc } = useMedia()
  const { isLogin } = useAuthStore()

  const axiosInstance: AxiosInstance = useAxiosWithAuth()
  const { data, error, isLoading } = useSWR<IPagination<ICardData[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase?page=${page}&pageSize=5`,
    isLogin
      ? (url: string) => axiosInstance.get(url).then((res) => res.data)
      : defaultGetFetcher,
  )

  const handlePrevClick = () => {
    if (!data) return
    if (index > 0) {
      setIndex(index - 1)
    }
  }

  // 현재 이후꺼는 미리 로딩해놓기
  // 이전 데이터는 지웠다가 다시 로딩하기
  // 이 기준 현 데이터에 카드가 15개 기준

  const handleNextClick = () => {
    if (!data) return
    if (index < data.content.length - 1) {
      setIndex(index + 1)
      if (index === data.content.length - 1) {
        setPage(page + 1)
      }
    }
  }

  const handleTouchStart = (e: TouchEvent) => {
    e.stopPropagation()
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: TouchEvent) => {
    e.stopPropagation()
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = (e: TouchEvent) => {
    e.stopPropagation()
    if (touchEnd < touchStart + 200) {
      if (!data) return
      if (index < data.content.length - 1) {
        setIndex(index + 1)
        setTouchEnd(0)
        setTouchStart(0)
      }
    } else {
      if (!data) return
      if (index > 0) {
        setIndex(index - 1)
        setTouchEnd(0)
        setTouchStart(0)
      }
    }
  }

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  }

  console.log(data)

  if (isPc) {
    return (
      <Stack direction={'row'} spacing={2} height={'600px'}>
        <Stack direction={'row'} spacing={1}>
          <PhoneFrame
            imageUrl={
              data?.content && data.content[index].image!
                ? data.content[index].image!
                : undefined
            }
          />
          <Stack direction={'column-reverse'}>
            <Stack>
              <IconButton onClick={handlePrevClick}>
                <ExpandLessIcon color="primary" />
              </IconButton>
              <IconButton onClick={handleNextClick}>
                <ExpandMoreIcon color="primary" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
        <ShowcaseCard data={data?.content ? data.content[index] : undefined} />
      </Stack>
    )
  }

  return (
    <Stack
      component={'div'}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {isLoading && page === 1 ? (
        <Typography>로딩 중...</Typography>
      ) : error || !data ? (
        <Typography>에러 발생</Typography>
      ) : data.content.length === 0 ? (
        <Typography>데이터가 없습니다</Typography>
      ) : (
        <motion.div ref={constraintsRef}>
          <motion.div
            key={index}
            variants={variants}
            drag="y"
            dragConstraints={constraintsRef}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            dragDirectionLock
            initial="hidden"
            animate="visible"
            exit={'exit'}
            transition={{ duration: 0.3 }}
          >
            <ShowcaseCard data={data.content[index]} />
          </motion.div>
        </motion.div>
      )}
    </Stack>
  )
}

export default ShowcasePage
