import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { ITeamInfo } from '../page'
import { useRouter } from 'next/navigation'
import { TeamOperationForm } from '@/app/teams/types/types'
import { grey } from '@mui/material/colors'
import useMedia from '@/hook/useMedia'
import { GeoIcon, TargetIcon, WifiIcon } from './Icons'

const TeamType = (type: string) => {
  return (
    <Box width={60} sx={{ margin: 0, backgroundColor: grey[900] }}>
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

const TeamCard = ({ team }: { team: ITeamInfo }) => {
  const { isPc } = useMedia()
  const router = useRouter()

  return (
    <Card
      key={team.id}
      sx={{
        overflow: 'visible',
        py: '2rem',
        px: '1.5rem',
        boxShadow: 'none',
        borderRadius: '1.5rem',
      }}
    >
      <CardActionArea onClick={() => router.push(`/teams/${team.id}`)}>
        <Stack
          direction={isPc ? 'row' : 'column'}
          spacing={'0.5rem'}
          my={'0.5rem'}
        >
          {TeamType(team.type)}
          <Typography
            sx={isPc ? undefined : { height: '4rem', overflow: 'hidden' }}
          >
            {team.name}
          </Typography>
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
