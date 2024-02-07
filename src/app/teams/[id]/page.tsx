'use client'

import { useRouter } from 'next/navigation'
import { Stack } from '@mui/material'
import TeamInfoContainer from './panel/TeamInfoContainer'
// import TeamDnD from './panel/TeamDnD'
import CuButton from '@/components/CuButton'
import ForbiddenDolphin from '@/components/WorkingDolphin'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { id } = params

  return (
    <Stack spacing={'1.5rem'} width={'100%'}>
      <CuButton
        action={() => router.push('/team-list')}
        message={'팀 리스트로 돌아가기'}
        TypographyProps={{
          color: 'text.alternative',
          variant: 'Caption',
        }}
        variant="text"
        style={{ width: 'fit-content' }}
      />
      <TeamInfoContainer id={Number(id)} />
      {/*준비중 메세지*/}
      <Stack
        width={'100%'}
        height={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{
          borderRadius: '1rem',
          backgroundColor: 'background.secondary',
        }}
      >
        <ForbiddenDolphin message="메인 팀페이지는 준비중입니다!" />
      </Stack>
      {/*<TeamDnD id={id} />*/}
    </Stack>
  )
}

export default TeamsPage
