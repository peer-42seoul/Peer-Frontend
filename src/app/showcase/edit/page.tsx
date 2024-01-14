'use client'

import { Stack } from '@mui/material'
import React from 'react'
import ShowcaseEditor from './panel/ShowcaseEditor'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
import useAxiosWithAuth from '@/api/config'
import { IShowcaseEditorFields } from '@/types/IShowcaseEdit'
import { mock } from 'node:test'

/*
  계획
    - 모바일
      device detect(브라우저 헤더로 기기 판단하는 라이브러리)로 모바일 처리, 모바일에서는 접근 불가능한 페이지임
    - 데스크탑
      1. 폼 컴포넌트 배치
      2. 버튼 배치
*/

// interface IShowcase {
//   title: string
//   skills: string[]
//   start: string
//   end: string
//   memberList: IMember[]
//   links: string[]
// }
const mockData: IShowcaseEditorFields = {
  title: '42peer',
  skills: ['React', 'TypeScript', 'Node.js'],
  start: '2024-01-01',
  end: '2024-12-31',
  memberList: [
    { nickname: '홍길동', role: '프론트엔드 개발자' },
    { nickname: '이순신', role: '백엔드 개발자' },
  ],
  links: ['www.example1.com', 'www.example2.com'],
}

const ShowCaseEditPage = () => {
  // const teamId = 42
  // const axiosWithAuth = useAxiosWithAuth()
  // const { data, isLoading, error } = useSWR<IShowcaseEditorFields>(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/${teamId}`,
  //   defaultGetFetcher,
  // (url: ?string) => axiosWithAuth.get(url).then((res) => res.data),
  // )

  // if (isLoading) return <div>로딩 중입니다...</div>
  // if (error) return <div>에러가 발생했습니다.</div>

  return (
    <Stack direction={'column'}>
      <ShowcaseEditor data={mockData} />
    </Stack>
  )
}

export default ShowCaseEditPage
