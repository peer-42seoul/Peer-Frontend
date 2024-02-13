import { Stack } from '@mui/material'
import { ITeamInfo } from '../page'
import { TeamStatus } from '@/app/teams/types/types'

//icons

import TeamCard from './TeamCard'
import NoDataDolphin from '@/components/NoDataDolphin'

const TeamsList = ({ prop }: { prop: ITeamInfo[] }) => {
  return (
    <Stack
      spacing={'0.2rem'}
      sx={{ p: '0.25rem' }}
      height={'75vh'}
      flex={'2rem'}
      minWidth={'53svw'}
    >
      <Stack
        spacing={'0.5rem'}
        overflow={'auto'}
        sx={{ p: '0.5rem' }}
        height={'55vh'}
        maxHeight={'55vh'}
        flex={'2rem'}
      >
        {prop.length &&
        prop.filter(
          (team) =>
            team.isApproved === true || team.status === TeamStatus.RECRUITING,
        ).length !== 0 ? (
          prop
            .filter(
              (team) =>
                team.isApproved === true ||
                team.status === TeamStatus.RECRUITING,
            )
            .map((team, index) => (
              <TeamCard key={team.name + index} team={team} />
            ))
        ) : (
          <NoDataDolphin message="아직 참가한 팀이 없습니다." />
        )}
      </Stack>
    </Stack>
  )
}

export default TeamsList
