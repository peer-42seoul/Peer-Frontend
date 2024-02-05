'use client'

import { useRouter } from 'next/navigation'
import { Typography, Box, Stack } from '@mui/material'
import TeamInfoContainer from './panel/TeamInfoContainer'
// import TeamDnD from './panel/TeamDnD'
import Image from 'next/image'

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
    </Box>
  )
}

export default TeamsPage
