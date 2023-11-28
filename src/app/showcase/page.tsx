'use client'

import { Stack } from '@mui/material'
import ShowcaseCard from './panel/ShowcaseCard'
import { TouchEvent, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export interface ShowcasePageProps {
  name: string
  image: string
  description: string
  startDate: string
  endDate: string
  techStack: string[]
  like: number
  interest: boolean
}

const mockData: ShowcasePageProps[] = [
  {
    name: '팀 이름0',
    image: 'https://source.unsplash.com/user/500*1000?0',
    description: 'aaaaaaaaaaaaaaaaa',
    startDate: '시작일',
    endDate: '종료일',
    techStack: ['기술 스택'],
    like: 0,
    interest: true,
  },
  {
    name: '팀 이름1',
    image: 'https://source.unsplash.com/random/500*1000?1',
    description: 'bbbbbbbbbbbbbbbb',
    startDate: '시작일',
    endDate: '종료일',
    techStack: ['기술 스택'],
    like: 0,
    interest: true,
  },
  {
    name: '팀 이름2',
    image: 'https://source.unsplash.com/random/500*1000?2',
    description: 'ccccccccccccccccccc',
    startDate: '시작일',
    endDate: '종료일',
    techStack: ['기술 스택'],
    like: 0,
    interest: true,
  },
  {
    name: '팀 이름3',
    image: 'https://source.unsplash.com/random/500*1000?3',
    description: 'ddddddddddddddddd',
    startDate: '시작일',
    endDate: '종료일',
    techStack: ['기술 스택'],
    like: 0,
    interest: true,
  },
  {
    name: '팀 이름4',
    image: 'https://source.unsplash.com/random/500*1000?4',
    description: 'eeeeeeeeeeeeeeeeee',
    startDate: '시작일',
    endDate: '종료일',
    techStack: ['기술 스택'],
    like: 0,
    interest: true,
  },
]

const ShowcasePage = () => {
  const [datas, setDatas] = useState<ShowcasePageProps[]>(mockData)
  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    setDatas(mockData)
  }, [])

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
    if (touchEnd < touchStart) {
      if (index < datas.length - 1) {
        setIndex(index + 1)
        setTouchEnd(0)
        setTouchStart(0)
      }
    } else {
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

  return (
    <Stack
      component={'div'}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        key={index}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit={'exit'}
        transition={{ duration: 0.3 }}
      >
        <ShowcaseCard data={datas[index]} />
      </motion.div>
    </Stack>
  )
}

export default ShowcasePage
