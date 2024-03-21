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
import Image from 'next/image'

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
        height: '6.5rem',
        display: 'flex',
        alignItems: 'center',
      }}
      key={alert.notificationId + alert.type}
    >
      <CardActionArea
        sx={{
          height: '6.3rem',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={() => router.push(alert.redirectUrl)}
      >
        <Stack p={'0.5rem'} flex={1}>
          <Image src={alert.iconUrl} alt={alert.type} width={50} height={50} />
        </Stack>
        <Stack
          direction={'row'}
          spacing={1}
          display={'flex'}
          alignItems={'center'}
          flex={8}
        >
          <Stack display={'flex'}>
            <Stack>
              {alert.type === AlarmType.SYSTEM && <SystemIcon />}
              {alert.type === AlarmType.TEAM && <TeamIcon />}
              {alert.type === AlarmType.MESSAGE && <MessageIcon />}
            </Stack>
            <Stack
              minHeight={'4rem'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography
                variant="Body2"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {alert.body}
              </Typography>
            </Stack>
          </Stack>
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
