import { Stack, Typography } from '@mui/material'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { TTeamStatus } from '@/types/ITeamInfo'

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
        <Stack direction={'row'}>
          <GroupsOutlinedIcon color="action" />
          <Typography>{text}</Typography>
        </Stack>
      )
    case 'LEADER':
      return (
        <Stack direction={'row'}>
          <PermContactCalendarOutlinedIcon color="action" />
          <Typography>{text}</Typography>
        </Stack>
      )
    case 'DATE':
      return (
        <Stack direction={'row'}>
          <CalendarMonthOutlinedIcon color="action" />
          <Typography>{text} ~</Typography>
        </Stack>
      )
  }
}
