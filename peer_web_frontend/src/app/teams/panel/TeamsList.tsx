import { Card, IconButton, Stack, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { useRouter } from 'next/navigation'
import { ITeamInfo } from '../page'

const TeamsList = ({ prop }: { prop: ITeamInfo[] }) => {
  const router = useRouter()
  return (
    <Stack
      spacing={1}
      sx={{ p: 1 }}
      flex={4}
      border="1px solid"
      borderRadius={2}
    >
      {prop.map((team, index) => (
        <Card key={index} sx={{ p: 2, boxShadow: 'none', border: '1px solid' }}>
          <IconButton
            sx={{ float: 'right' }}
            onClick={() => router.push(`/teams/setup/${index}`)}
          >
            <SettingsIcon />
          </IconButton>
          <Typography>팀 종류: {team.type}</Typography>
          <Typography>팀 이름: {team.name}</Typography>
          <Typography>팀 상태: {team.status}</Typography>
          <Typography>팀 활동 기간: {team.deadline}</Typography>
          <Typography>팀원: {team.members}</Typography>
          <Typography>활동 장소: {team.location}</Typography>
          <Typography>활동 시간: {team.activity}</Typography>
        </Card>
      ))}
    </Stack>
  )
}

export default TeamsList
