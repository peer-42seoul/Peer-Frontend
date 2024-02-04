import TeamTypeCard from '@/app/team-list/panel/TeamTypeCard'
import { ITeam } from '@/app/teams/types/types'
import { Button, Card, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const RedirectRecruitPage = ({ id, data }: { id: string; data: ITeam }) => {
  const router = useRouter()
  return (
    <Card sx={{ p: '1.5rem', borderRadius: '1rem' }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography>모집글</Typography>
        <Button
          variant="outlined"
          onClick={() => router.push(`/recruit/${id}?type=${data.team.type}`)}
        >
          모집 글 보기
        </Button>
      </Stack>
      <Stack direction={'row'} spacing={'1.5rem'} alignItems={'center'}>
        <TeamTypeCard type={data.team.type} />
        <Typography>{data.team.name}</Typography>
      </Stack>
    </Card>
  )
}

export default RedirectRecruitPage
