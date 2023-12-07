'use client'

import { useRouter } from 'next/navigation'
import { Typography, Stack } from '@mui/material'
import TeamInfoContainer from './panel/TeamInfoContainer'
import TeamDnD from './panel/TeamDnD'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { id } = params

  return (
    <Stack spacing={2} flex={1}>
      <Typography
        onClick={() => router.push('/team-list')}
        sx={{ color: '#9B9B9B', cursor: 'pointer' }}
      >
        팀리스트로 돌아가기
      </Typography>
      <TeamInfoContainer id={Number(id)} />
      <TeamDnD id={id} />
    </Stack>
  )
}

export default TeamsPage
