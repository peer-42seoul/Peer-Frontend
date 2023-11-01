import { Chip, Stack, Typography } from '@mui/material'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { TTeamStatus } from '@/types/ITeamInfo'

export const StatusIcon = ({ status }: { status: TTeamStatus }) => {
  switch (status) {
    case 'RECRUITING':
      return <Chip label={'모집 중'} sx={{ backgroundColor: '#FFFBDB' }} />
    case 'BEFORE':
      return <Chip label={'시작 전'} sx={{ backgroundColor: '#B5B5B5' }} />
    case 'ONGOING':
      return <Chip label={'진행 중'} sx={{ backgroundColor: '#EADFFF' }} />
    case 'COMPLETE':
      return <Chip label={'진행 완료'} sx={{ backgroundColor: '#F7C5C5' }} />
  }
}

type TIconType = 'MEMBER' | 'LEADER' | 'DATE'

interface IIconInfoProps {
  type: TIconType
  text: string
  onClick?: () => void
}

export const IconInfo = ({ type, text, onClick }: IIconInfoProps) => {
  switch (type) {
    case 'MEMBER':
      return (
        <Stack direction={'row'} onClick={onClick} sx={{ cursor: 'pointer' }}>
          <GroupsOutlinedIcon />
          <Typography>{text}</Typography>
        </Stack>
      )
    case 'LEADER':
      return (
        <Stack direction={'row'}>
          <PermContactCalendarOutlinedIcon />
          <Typography>{text}</Typography>
        </Stack>
      )
    case 'DATE':
      return (
        <Stack direction={'row'}>
          <CalendarMonthOutlinedIcon />
          <Typography>{text} ~</Typography>
        </Stack>
      )
  }
}
