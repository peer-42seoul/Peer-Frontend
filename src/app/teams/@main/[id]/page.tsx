'use client'

import { Typography, Stack, Box } from '@mui/material'
import TeamInfoContainer from './panel/TeamInfoContainer'
import CuButton from '@/components/CuButton'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params

  return (
    <Stack>
      {/* 팀 리스트로 가는 기능 추가하기 */}
      <Typography sx={{ color: '#9B9B9B' }}>팀리스트로 돌아가기</Typography>
      <TeamInfoContainer id={Number(id)} />
      <Box>Drag And Drop</Box>
      <CuButton
        message={'팀페이지 수정'}
        action={() => {}}
        variant={'contained'}
        fullWidth={false}
        disabled
      />
    </Stack>
  )
}

export default TeamsPage
