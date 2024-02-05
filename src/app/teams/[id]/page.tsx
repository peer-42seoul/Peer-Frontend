'use client'

import { useRouter } from 'next/navigation'
import { Typography, Stack } from '@mui/material'
import TeamInfoContainer from './panel/TeamInfoContainer'
// import TeamDnD from './panel/TeamDnD'
import Image from 'next/image'
import CuButton from '@/components/CuButton'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { id } = params

  return (
    <Stack spacing={'1.5rem'} width={'100%'}>
      <CuButton
        action={() => router.push('/team-list')}
        message={'팀리스트로 돌아가기'}
        TypographyProps={{
          color: 'text.normal',
          variant: 'Title3',
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
      >
        <Image
          src={'/images/dolphin.png'}
          width={300}
          height={200}
          alt="고래 이미지"
        />
        <Typography variant="Title3">메인 팀페이지는 준비중입니다!</Typography>
        <Typography variant="Body2">(다른 기능은 이용 가능합니다)</Typography>
      </Stack>
      {/*<TeamDnD id={id} />*/}
    </Stack>
  )
}

export default TeamsPage
