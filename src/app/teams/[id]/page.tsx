'use client'

import { useRouter } from 'next/navigation'
import { Stack } from '@mui/material'
import TeamInfoContainer from './panel/TeamInfoContainer'
// import TeamDnD from './panel/TeamDnD'
import CuButton from '@/components/CuButton'
import { useEffect, useState } from 'react'
import CuCircularProgress from '@/components/CuCircularProgress'
import TeamDnD from '@/app/teams/[id]/panel/TeamDnD'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    setIsClient(true) // 모바일 환경에서 hydration을 막기 위한 변수
  }, [])

  if (!isClient) return <CuCircularProgress color="primary" />

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
      <TeamDnD id={id} />
    </Stack>
  )
}

export default TeamsPage
