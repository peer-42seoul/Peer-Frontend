'use client'

import { useRouter } from 'next/navigation'
import { Typography, Stack } from '@mui/material'
import CuButton from '@/components/CuButton'

// test import
import CalendarMini from './panel/CalendarMini'
import CalendarLarge from './panel/CalendarLarge'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { id } = params

  return (
    <Stack spacing={2}>
      <Typography
        onClick={() => router.push('/team-list')}
        sx={{ color: '#9B9B9B', cursor: 'pointer' }}
      >
        팀리스트로 돌아가기
      </Typography>
      {/* <TeamInfoContainer id={Number(id)} /> */}
      {/* 임시 컴포넌트 */}
      <Stack direction={'row'} spacing={2}>
        <CalendarMini />
        <CalendarLarge />
      </Stack>
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
