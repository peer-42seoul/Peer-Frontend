'use client'

import { AlarmType, IAlarm } from '@/states/useAlarmStorage'
import {
  Card,
  CardActionArea,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { SystemIcon, TeamIcon, MessageIcon } from './Icons'
import { CloseIcon } from '@/icons'
import { useRouter } from 'next/navigation'

interface IAlertCard {
  alert: IAlarm
  handleDelete: (id: number) => void
}

const AlertCard = ({ alert, handleDelete }: IAlertCard) => {
  const router = useRouter()
  return (
    <Card
      sx={{
        m: 2,
        height: '4rem',
        display: 'flex',
        alignItems: 'center',
      }}
      key={alert.notificationId + alert.type}
    >
      <CardActionArea
        sx={{
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={() => router.push(alert.redirectUrl)}
      >
        <Stack p={'0.5rem'} flex={1}>
          {alert.type === AlarmType.SYSTEM && <SystemIcon fontSize="large" />}
          {alert.type === AlarmType.TEAM && <TeamIcon fontSize="large" />}
          {alert.type === AlarmType.MESSAGE && <MessageIcon fontSize="large" />}
        </Stack>
        <Stack
          direction={'row'}
          spacing={1}
          display={'flex'}
          alignItems={'center'}
          flex={8}
        >
          <Typography
            variant="Body2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {alert.body}
          </Typography>
        </Stack>
      </CardActionArea>
      <Stack flex={1}>
        <IconButton onClick={() => handleDelete(alert.notificationId)}>
          <CloseIcon />
        </IconButton>
      </Stack>
    </Card>
  )
}

export default AlertCard
