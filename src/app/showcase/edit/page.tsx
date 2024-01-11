import { Stack } from '@mui/material'
import React from 'react'
import ShowcaseEditor from './panel/ShowcaseEditor'

/*
  계획
    - 모바일
      device detect(브라우저 헤더로 기기 판단하는 라이브러리)로 모바일 처리, 모바일에서는 접근 불가능한 페이지임
    - 데스크탑
      1. 폼 컴포넌트 배치
      2. 버튼 배치
*/
const page = () => {
  return (
    <Stack direction={'column'}>
      <ShowcaseEditor />
    </Stack>
  )
}

export default page
