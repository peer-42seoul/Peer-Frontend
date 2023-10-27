'use client'

import { Typography, Stack } from '@mui/material'
import TeamInfoContainer from './panel/TeamInfoContainer'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params

  return (
    <Stack>
      {/* 팀 리스트로 가는 기능 추가하기 */}
      <Typography sx={{ color: '#9B9B9B' }}>팀리스트로 돌아가기</Typography>
      <TeamInfoContainer id={Number(id)} />
    </Stack>
  )
}

export default TeamsPage
