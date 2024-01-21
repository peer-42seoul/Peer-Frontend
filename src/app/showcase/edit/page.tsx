'use client'

import { Stack, Typography } from '@mui/material'
import React from 'react'
import ShowcaseEditor from '../panel/ShowcaseEditor'
import { IShowcaseEditorFields } from '@/types/IShowcaseEdit'
import useAxiosWithAuth from '@/api/config'
import useSWR from 'swr'
import CuCircularProgress from '@/components/CuCircularProgress'

/*
  계획
    - 모바일
      device detect(브라우저 헤더로 기기 판단하는 라이브러리)로 모바일 처리, 모바일에서는 접근 불가능한 페이지임
    - 데스크탑
      1. 폼 컴포넌트 배치
      2. 버튼 배치
*/

// const mockData: IShowcaseEditorFields = {
//   title: '42peer',
//   skills: [
//     {
//       name: 'Javascript',
//       Id: 1,
//       color: '#F0DB4F',
//     },
//     {
//       name: 'React',
//       Id: 2,
//       color: '#61DBFB',
//     },
//     {
//       name: 'Python',
//       Id: 3,
//       color: '#3776AB',
//     },
//   ],
//   start: '2024-01-01',
//   end: '2024-12-31',
//   memberList: [
//     {
//       nickname: '홍길동',
//       role: '프론트엔드 개발자',
//       image: '',
//       isLeader: false,
//     },
//     { nickname: '이순신', role: '백엔드 개발자', image: '', isLeader: false },
//     { nickname: '이순신', role: '리더', image: '', isLeader: false },
//   ],
//   links: [{ linkName: '깃허브', linkUrl: '이름없음', id: 0 }],
// }

const ShowCaseEditPage = () => {
  const teamId = 2
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR<IShowcaseEditorFields>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/write/${teamId}`,
    // defaultGetFetcher,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
    { shouldRetryOnError: false },
  )

  if (isLoading) return <CuCircularProgress color={'secondary'} />
  if (error)
    return <Typography color={'error'}>에러가 발생했습니다.</Typography>

  return (
    <Stack direction={'column'} sx={{ overflow: 'auto' }}>
      {data && (
        <ShowcaseEditor
          data={data}
          teamId={teamId}
          requestMethodType={'put'}
          router={null}
        />
      )}
      {/* <ShowcaseEditor data={mockData} teamId={teamId} /> */}
    </Stack>
  )
}

export default ShowCaseEditPage
