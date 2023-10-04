import { Box, Stack, Typography } from '@mui/material'
import { ITeamInfo } from '../../page'

const SetupTeam = ({ team }: { team: ITeamInfo }) => {
  return (
    <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
      <Typography fontWeight="bold">클릭한 프로젝트명 팀 설정 : </Typography>
      <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
        <Typography>팀 상태: {team.status}</Typography>
        <Stack direction="row" spacing={2}>
          <Typography>{team.type}</Typography>
          <Typography>프로젝트명: {team.name}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>목표 기간: {team.deadline}</Typography>
          <Typography>팀 최대 인원: {team.members}</Typography>
          <Typography>활동 방식: {team.activity}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>팀 활동 지역: {team.location}</Typography>
        </Stack>
      </Box>
    </Box>
  )
}

export default SetupTeam
