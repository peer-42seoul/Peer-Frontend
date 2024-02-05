import { Stack, Typography } from '@mui/material'
import { TTeamStatus } from '@/types/ITeamInfo'
import { GroupIcon, TimeIcon, AccountBox } from '@/icons'

const teamStatusMessage = {
  RECRUITING: {
    message: '모집중',
    color: 'yellow.strong',
  },
  BEFORE: {
    message: '시작전',
    color: 'yellow.strong',
  },
  ONGOING: {
    message: '진행중',
    color: 'yellow.strong',
  },
  COMPLETE: {
    message: '완료',
    color: 'yellow.strong',
  },
}

type TIconType = 'MEMBER' | 'LEADER' | 'DATE'

interface IIconInfoProps {
  type: TIconType
  text: string
}

export const StatusIcon = ({ status }: { status: TTeamStatus }) => {
  return (
    <Typography variant="Caption" color={teamStatusMessage[status].color}>
      {teamStatusMessage[status].message}
    </Typography>
  )
}

export const IconInfo = ({ type, text }: IIconInfoProps) => {
  switch (type) {
    case 'MEMBER':
      return (
        <Stack alignItems={'center'} spacing={'0.25rem'} direction={'row'}>
          <GroupIcon sx={{ width: '1rem', color: 'text.alternative' }} />
          <Typography variant={'Caption'} color={'text.alternative'}>
            {text}
          </Typography>
        </Stack>
      )
    case 'LEADER':
      return (
        <Stack alignItems={'center'} spacing={'0.25rem'} direction={'row'}>
          <AccountBox
            spacing={'0.25rem'}
            sx={{ width: '1rem', color: 'text.alternative' }}
          />
          <Typography variant={'Caption'} color={'text.alternative'}>
            {text}
          </Typography>
        </Stack>
      )
    case 'DATE':
      return (
        <Stack alignItems={'center'} spacing={'0.25rem'} direction={'row'}>
          <TimeIcon sx={{ width: '1rem', color: 'text.alternative' }} />
          <Typography variant={'Caption'} color={'text.alternative'}>
            {text} ~
          </Typography>
        </Stack>
      )
  }
}
