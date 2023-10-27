'use client'

import { Typography } from '@mui/material'
import TeamInfoContainer from './panel/TeamInfoContainer'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params

  return (
    <>
      {/* 뒤로가기 기능 추가하기 */}
      <Typography>팀리스트로 돌아가기</Typography>
      <TeamInfoContainer id={Number(id)} />
    </>
  )
}

export default TeamsPage
