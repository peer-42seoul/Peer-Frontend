import dayjs from 'dayjs'
import { Box, Stack, Typography } from '@mui/material'
import { IMessage, IMessageUser } from '@/types/IMessage'
import CuAvatar from '@/components/CuAvatar'
import * as style from './MessageItem.style'

type TMessageOption = 'TOP' | 'NEED_EXTRA_MARGIN' | 'NORMAL'
interface IOwnerMessageItemProps {
  message: IMessage
  messageOption: TMessageOption
}
interface ITargetMessageItemProps {
  message: IMessage
  messageOption: TMessageOption
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
      sx={style.date}
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
  messageOption,
}: IOwnerMessageItemProps) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'flex-end'}
      alignItems={'flex-end'}
      spacing={'0.5rem'}
      sx={messageOption === 'NEED_EXTRA_MARGIN' ? style.extraMargin : undefined}
    >
      <MessageDate date={message.date} />
      <Box sx={style.ownerMessage}>
        <Typography variant={'body1'}>{message.content}</Typography>
      </Box>
    </Stack>
  )
}

export const TargetMessageItem = ({
  message,
  target,
  messageOption,
}: ITargetMessageItemProps) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
      spacing={'0.5rem'}
      sx={messageOption === 'NEED_EXTRA_MARGIN' ? style.extraMargin : undefined}
    >
      {messageOption === 'NORMAL' ? (
        <Box sx={style.dummyAvatar}></Box>
      ) : (
        <CuAvatar
          src={target.userProfile}
          alt={target.userNickname}
          sx={style.targetAvatar}
        />
      )}
      <Box sx={style.targetMessage}>
        <Typography variant={'body1'}>{message.content}</Typography>
      </Box>
      <MessageDate date={message.date} />
    </Stack>
  )
}
