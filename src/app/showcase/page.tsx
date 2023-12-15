'use client'

import { IconButton, Stack } from '@mui/material'
import ShowcaseCard from './panel/ShowcaseCard'
import { TouchEvent, useCallback, useEffect, useRef, useState } from 'react'
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
  const [cards, setCards] = useState<ICardData[]>([])
  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const constraintsRef = useRef(null)
  const { isPc } = useMedia()
  const { isLogin } = useAuthStore()
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading } = useSWR<IPagination<ICardData[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase?page=${page}&pageSize=10`,
    isLogin
      ? (url: string) => axiosWithAuth.get(url).then((res) => res.data)
      : defaultGetFetcher,
  )

  useEffect(() => {
    if (!isLoading && data?.content) {
      // setCards((prev) => [...data.content].reverse().concat(prev))
      if (data.first) setCards([...data.content])
      else setCards([...cards, ...data.content])
    }
  }, [isLoading, data, setCards])

  const handlePrevClick = () => {
    if (!data) return
    if (index > 0) {
      setIndex(index - 1)
    }
  }

  const handleNextClick = useCallback(() => {
    if (!cards) return
    if (index < cards.length - 1) {
      setIndex(index + 1)
      if (index === cards.length - 3) {
        setPage(page + 1)
      }
    }
  }, [index, page, cards])

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
    const swipeDistance = touchEnd - touchStart

    if (Math.abs(swipeDistance) < 30) {
      // 스와이프 거리가 충분하지 않음
      return
    }

    if (swipeDistance < 0) {
      // 위로 스와이프
      if (index < cards.length - 1) {
        setIndex(index + 1)
        if (index === cards.length - 3) {
          setPage(page + 1)
        }
      }
    } else {
      // 아래로 스와이프
      if (index > 0) {
        setIndex(index - 1)
      }
    }

    setTouchEnd(0)
    setTouchStart(0)
  }

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  }

  if (isPc) {
    return (
      <>
        <Stack direction={'row'} spacing={2} height={'600px'}>
          <Stack direction={'row'} spacing={1}>
            <PhoneFrame
              imageUrl={cards[index] ? cards[index].image! : undefined}
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
          <ShowcaseCard data={cards ? cards[index] : undefined} />
        </Stack>
      </>
    )
  }

  return (
    <Stack
      component={'div'}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
          <ShowcaseCard data={cards ? cards[index] : undefined} />
        </motion.div>
      </motion.div>
    </Stack>
  )
}

export default ShowcasePage
