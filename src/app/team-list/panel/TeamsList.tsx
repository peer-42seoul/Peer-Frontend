import { Stack, Typography } from '@mui/material'
import { ITeamInfo } from '../page'
import { TeamStatus } from '@/app/teams/types/types'

//icons
import useShowTeams from '@/states/useShowTeams'
import TeamCard from './TeamCard'
import NoDataDolphin from '@/components/NoDataDolphin'

const TeamsList = ({ prop }: { prop: ITeamInfo[] }) => {
  const { showTeams } = useShowTeams()

  return (
    <Stack
      spacing={'0.2rem'}
      sx={{ p: '0.25rem' }}
      height={'75vh'}
      flex={'2rem'}
    >
      <Stack>
        <Typography fontWeight={'bold'} my={'1rem'}>
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
        spacing={'0.5rem'}
        overflow={'auto'}
        sx={{ p: '0.5rem' }}
        height={'55vh'}
        maxHeight={'55vh'}
        flex={'2rem'}
      >
        {prop.length ? (
          prop.map((team, index) => <TeamCard key={index} team={team} />)
        ) : (
          <NoDataDolphin message="아직 참가한 팀이 없습니다." />
        )}
      </Stack>
    </Stack>
  )
}

export default TeamsList
