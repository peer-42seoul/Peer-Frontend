import { Stack, Typography } from '@mui/material'
import { ITeamInfo } from '../page'
import { TeamStatus } from '@/app/teams/types/types'

//icons
import useShowTeams from '@/states/useShowTeams'
import TeamCard from './TeamCard'

const TeamsList = ({ prop }: { prop: ITeamInfo[] }) => {
  const { showTeams } = useShowTeams()

  return (
    <Stack spacing={1} sx={{ p: 1 }} height={'75vh'} flex={4}>
      <Stack>
        <Typography fontWeight={'bold'} my={2}>
          {showTeams === TeamStatus.RECRUITING
            ? '모집 중'
            : showTeams === TeamStatus.COMPLETE
              ? '진행 완료'
              : showTeams === TeamStatus.ONGOING
                ? '진행 중'
                : '모집 완료'}
        </Typography>
      </Stack>
      <Stack
        spacing={1}
        overflow={'auto'}
        sx={{ p: 1 }}
        height={'55vh'}
        maxHeight={'55vh'}
        flex={4}
      >
        {prop.length === 0 && (
          <Typography>아직 참가한 팀이 없습니다.</Typography>
        )}
        {prop.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </Stack>
    </Stack>
  )
}

export default TeamsList
