import dayjs from 'dayjs'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { IMessage, IMessageUser } from '@/types/IMessage'
import * as style from './MessageItem.style'

interface IOwnerMessageItemProps {
  message: IMessage
  needExtraMargin?: boolean
}
interface ITargetMessageItemProps {
  message: IMessage
  needExtraMargin?: boolean
  target: IMessageUser
}

const MessageDate = ({ date }: { date: string }) => {
  // TODO : UTCtoLocalTime 함수로 시간 변환할 것
  const dayjsDate = dayjs(date)
  const ampm = dayjsDate.hour() < 12 ? '오전' : '오후'
  return (
    <Stack
      justifyContent={'flex-end'}
      alignItems={'center'}
      spacing={'0.125rem'}
    >
      <Typography variant={'CaptionEmphasis'} color={'text.assistive'}>
        {dayjsDate.format('MM월 DD일')}
      </Typography>
      <Typography variant={'CaptionEmphasis'} color={'text.assistive'}>
        {ampm} {dayjsDate.format('HH:mm')}
      </Typography>
    </Stack>
  )
}

export const OwnerMessageItem = ({
  message,
  needExtraMargin,
}: IOwnerMessageItemProps) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'flex-end'}
      alignItems={'flex-end'}
      spacing={'0.5rem'}
      sx={needExtraMargin ? style.extraMargin : undefined}
    >
      <MessageDate date={message.date} />
      <Box sx={style.ownerMessage}>
        <Typography variant={'body1'} color={'text.'}>
          {message.content}
        </Typography>
      </Box>
    </Stack>
  )
}

export const TargetMessageItem = ({
  message,
  target,
  needExtraMargin,
}: ITargetMessageItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Stack sx={{ bgcolor: '#D8D8D8', alignItems: 'flex-start' }} spacing={1}>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <Avatar src={target.userProfile} />
          <Typography sx={{ fontWeight: 'bold' }}>
            {target.userNickname}
          </Typography>
        </Stack>
        <Typography>{message.content}</Typography>
        <Typography>{message.date}</Typography>
      </Stack>
    </Box>
  )
}
