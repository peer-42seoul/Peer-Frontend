'use client'

import { Avatar, Stack, Typography } from '@mui/material'
import ShowcaseCard from './panel/ShowcaseCard'
import { TouchEvent, useState } from 'react'

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
    image: 'https://source.unsplash.com/random/500*1000',
    description: 'aaaaaaaaaaaaaaaaa',
    startDate: '시작일',
    endDate: '종료일',
    techStack: ['기술 스택'],
    like: 0,
    interest: true,
  },
  {
    name: '팀 이름1',
    image: 'https://source.unsplash.com/random/500*1000',
    description: 'bbbbbbbbbbbbbbbb',
    startDate: '시작일',
    endDate: '종료일',
    techStack: ['기술 스택'],
    like: 0,
    interest: true,
  },
  {
    name: '팀 이름2',
    image: 'https://source.unsplash.com/random/500*1000',
    description: 'ccccccccccccccccccc',
    startDate: '시작일',
    endDate: '종료일',
    techStack: ['기술 스택'],
    like: 0,
    interest: true,
  },
  {
    name: '팀 이름3',
    image: 'https://source.unsplash.com/random/500*1000',
    description: 'ddddddddddddddddd',
    startDate: '시작일',
    endDate: '종료일',
    techStack: ['기술 스택'],
    like: 0,
    interest: true,
  },
  {
    name: '팀 이름4',
    image: 'https://source.unsplash.com/random/500*1000',
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

  return (
    <Stack>
      <ShowcaseCard data={datas[index]} />
    </Stack>
  )
}

export default ShowcasePage
