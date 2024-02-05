'use client'

import { useRouter } from 'next/navigation'
import { Typography, Box, Stack } from '@mui/material'
import TeamInfoContainer from './panel/TeamInfoContainer'
// import TeamDnD from './panel/TeamDnD'
import ForbiddenDolphin from '@/components/WorkingDolphin'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { id } = params

  return (
    <Box width={'100%'}>
      <Typography
        onClick={() => router.push('/team-list')}
        sx={{ color: '#9B9B9B', cursor: 'pointer' }}
      >
        팀리스트로 돌아가기
      </Typography>
      <TeamInfoContainer id={Number(id)} />
      {/*준비중 메세지*/}
      <Stack
        width={'100%'}
        height={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <ForbiddenDolphin message="메인 팀페이지는 준비중입니다!" />
      </Stack>
      {/*<TeamDnD id={id} />*/}
    </Box>
  )
}

export default TeamsPage
