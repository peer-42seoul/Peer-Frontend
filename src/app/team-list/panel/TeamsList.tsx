import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ITeamInfo } from '../page'
import { TeamOperationForm, TeamStatus } from '@/app/teams/@setting/[id]/page'

//icons
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import RoomIcon from '@mui/icons-material/Room'
import WifiIcon from '@mui/icons-material/Wifi'
import useShowTeams from '@/states/useShowTeams'
import { grey } from '@mui/material/colors'

const TeamsList = ({ prop }: { prop: ITeamInfo[] }) => {
  const router = useRouter()
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
        sx={{
          overflowY: 'scroll',
          height: '100%',
          padding: 1,
          overflow: 'hidden',
        }}
      >
        {prop.map((team, index) => (
          <Card
            key={index}
            sx={{
              p: 2,
              boxShadow: 'none',
              borderRadius: 3,
            }}
          >
            <CardActionArea onClick={() => router.push(`/teams/${team.id}`)}>
              {/* 기획상 문제로 임시로 주석처리 */}
              {/* {team.myRole && (
                <IconButton
                  sx={{ float: 'right' }}
                  onClick={() => router.push(`/teams/setup/${index}`)}
                >
                  <SettingsIcon />
                </IconButton>
              )}  */}
              <Stack direction={'row'} spacing={1} my={1}>
                <Box width={60} sx={{ margin: 0, backgroundColor: grey[900] }}>
                  <Typography
                    textAlign={'center'}
                    color={
                      team.type === 'STUDY' ? 'yellow.strong' : 'green.strong'
                    }
                    fontWeight={'bold'}
                  >
                    {team.type === 'STUDY' ? '스터디' : '프로젝트'}
                  </Typography>
                </Box>

                <Typography>{team.name}</Typography>
              </Stack>
              <Stack direction={'row'} spacing={2}>
                <Stack direction={'row'}>
                  <TrackChangesIcon fontSize="small" />
                  <Typography>목표 기간 {team.dueTo}</Typography>
                </Stack>
                <Stack direction={'row'}>
                  <RoomIcon fontSize="small" />
                  <Typography>지역 {team.region}</Typography>
                </Stack>
                <Stack direction={'row'}>
                  <WifiIcon fontSize="small" />
                  <Typography>
                    활동 방식{' '}
                    {team.operationFormat === TeamOperationForm.MIX
                      ? '온/오프라인'
                      : team.operationFormat === TeamOperationForm.OFFLINE
                        ? '오프라인'
                        : '온라인'}
                  </Typography>
                </Stack>
              </Stack>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Stack>
  )
}

export default TeamsList
