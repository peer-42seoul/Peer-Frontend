import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { ITeamInfo } from '../page'
import { useRouter } from 'next/navigation'
import { TeamOperationForm, TeamStatus } from '@/app/teams/types/types'
import useMedia from '@/hook/useMedia'
import { GeoIcon, TargetIcon, WifiIcon } from './Icons'

const TeamType = (type: string) => {
  return (
    <Box
      sx={{
        display: 'flex',
        margin: 0,
        backgroundColor: 'background.tertiary',
        borderRadius: '0.25rem',
        padding: '0.25rem 0.5rem',
        alignItems: 'center',
      }}
    >
      <Typography
        textAlign={'center'}
        color={type === 'STUDY' ? 'yellow.strong' : 'green.strong'}
        fontWeight={'bold'}
      >
        {type === 'STUDY' ? '스터디' : '프로젝트'}
      </Typography>
    </Box>
  )
}

const ApproveChip = ({
  isApproved,
  job,
}: {
  isApproved: boolean
  job: string
}) => {
  const isLeader = job === 'L' ? 'LEADER' : 'MEMBER'
  return (
    <Box
      sx={{
        margin: 0,
        backgroundColor: !isApproved
          ? 'red.strong'
          : isLeader === 'LEADER'
            ? (theme) => theme.palette.purple.main
            : (theme) => theme.palette.pink.main,
        borderRadius: '0.25rem',
        padding: '0.25rem 0.5rem',
        height: 'fit-content',
        alignItems: 'center',
      }}
    >
      <Typography textAlign={'center'} color={'white'} fontWeight={'bold'}>
        {isApproved ? isLeader : '대기중'}
      </Typography>
    </Box>
  )
}

interface ITeamCard {
  team: ITeamInfo
}

const TeamCard = ({ team }: ITeamCard) => {
  const { isPc } = useMedia()
  const router = useRouter()

  if (team.isApproved === false && team.status !== TeamStatus.RECRUITING) {
    return <></>
  }

  const handleTeam = () => {
    if (!team.isApproved) return
    router.push(`/teams/${team.id}`)
  }

  const handleRecruit = () => {
    if (team.isApproved) return
    router.push(`/recruit/${team.id}`)
  }

  return (
    <Card
      key={team.id}
      sx={{
        overflow: 'visible',
        py: '2rem',
        px: '1.5rem',
        boxShadow: 'none',
        borderRadius: '1.5rem',
        backgroundColor: 'background.secondary',
        backgroundImage: 'none',
      }}
    >
      <CardActionArea
        // disabled={!team.isApproved}
        sx={{
          '.MuiCardActionArea-focusHighlight': {
            background: 'transparent',
          },
        }}
        onClick={team.isApproved ? handleTeam : handleRecruit}
      >
        <Stack
          direction={isPc ? 'row' : 'column'}
          spacing={'0.5rem'}
          my={'0.5rem'}
          justifyContent={'space-between'}
        >
          <Stack direction={'row'} spacing={'0.5rem'} alignItems={'center'}>
            {TeamType(team.type)}
            <Typography
              sx={
                isPc
                  ? undefined
                  : {
                      display: 'center',
                      height: '4rem',
                      overflow: 'hidden',
                      alignItems: 'center',
                    }
              }
            >
              {team.name}
            </Typography>
          </Stack>
          <ApproveChip isApproved={team.isApproved} job={team.role[0]} />
        </Stack>
        <Stack direction={isPc ? 'row' : 'column'} spacing={'0.5rem'}>
          <Stack direction={'row'} spacing={isPc ? '0.5rem' : '1.5rem'}>
            <Stack direction={'row'} spacing={'0.25rem'} alignItems={'center'}>
              <Stack direction={'row'} alignItems={'center'}>
                <TargetIcon />
                <Typography fontSize={'0.75rem'} color={'text.alternative'}>
                  목표기간
                </Typography>
              </Stack>
              <Typography fontSize={'0.75rem'} color={'text.alternative'}>
                {team.dueTo}
              </Typography>
            </Stack>
            <Stack direction={'row'} spacing={'0.25rem'} alignItems={'center'}>
              <Stack direction={'row'} alignItems={'center'}>
                <GeoIcon />
                <Typography fontSize={'0.75rem'} color={'text.alternative'}>
                  지역
                </Typography>
              </Stack>
              <Typography fontSize={'0.75rem'} color={'text.alternative'}>
                {team.region}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={'row'} spacing={'0.25rem'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'}>
              <WifiIcon />
              <Typography fontSize={'0.75rem'} color={'text.alternative'}>
                활동방식
              </Typography>
            </Stack>
            <Typography fontSize={'0.75rem'} color={'text.alternative'}>
              {team.operationFormat === TeamOperationForm.ONLINE && '온라인'}
              {team.operationFormat === TeamOperationForm.OFFLINE && '오프라인'}
              {team.operationFormat === TeamOperationForm.MIX && '온/오프라인'}
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  )
}

export default TeamCard
