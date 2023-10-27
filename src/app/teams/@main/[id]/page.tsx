'use client'

import { useRouter } from 'next/navigation'
import { Typography, Stack, Box } from '@mui/material'
import CuButton from '@/components/CuButton'
import TeamInfoContainer from './panel/TeamInfoContainer'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { id } = params

  return (
    <Stack spacing={2}>
      {/* 팀 리스트로 가는 기능 추가하기 */}
      <Typography
        onClick={() => router.push('/team-list')}
        sx={{ color: '#9B9B9B', cursor: 'pointer' }}
      >
        팀리스트로 돌아가기
      </Typography>
      <TeamInfoContainer id={Number(id)} />
      {/* 임시 컴포넌트 */}
      <Box
        sx={{
          width: 600,
          height: 300,
          border: 1.55,
          padding: 2,
        }}
      >
        Drag And Drop
      </Box>
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
