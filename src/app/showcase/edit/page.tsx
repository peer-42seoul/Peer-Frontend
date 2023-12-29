import { Stack, Typography } from '@mui/material'
import React from 'react'
import ShowcaseEditor from './panel/ShowcaseEditor'

/*
  계획
    - 모바일
      device detect로 모바일 처리
    - 데스크탑
      1. 폼 컴포넌트 배치
      2. 버튼 배치
*/
const page = () => {
  return (
    <Stack direction={'column'}>
      <Typography variant={'HeadlineEmphasis'}>
        쇼케이스 편집 페이지!
      </Typography>
      <ShowcaseEditor />
    </Stack>
  )
}

export default page
