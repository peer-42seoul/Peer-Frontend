import dayjs from 'dayjs'
import { Box, Stack, Typography } from '@mui/material'
import CuAvatar from '@/components/CuAvatar'
import useMedia from '@/hook/useMedia'
import { IMessage, IMessageUser } from '@/types/IMessage'
import UTCtoLocalTime from '@/utils/UTCtoLocalTime'
import * as style from './MessageItem.style'

type TMessageOption = 'Top' | 'Normal' | 'Extra'
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
  const dayjsDate = dayjs(UTCtoLocalTime(date))
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
  const { isPc } = useMedia()
  return (
    <Stack
      direction={'row'}
      justifyContent={'flex-end'}
      alignItems={'flex-end'}
      spacing={'0.5rem'}
      sx={style[`contentMargin${messageOption}`]}
    >
      <MessageDate date={message.date} />
      <Box sx={isPc ? style.ownerPc : style.ownerMobile}>
        <Typography variant={'Body1'}>{message.content}</Typography>
      </Box>
    </Stack>
  )
}

export const TargetMessageItem = ({
  message,
  target,
  messageOption,
}: ITargetMessageItemProps) => {
  const { isPc } = useMedia()
  return (
    <Stack
      direction={'row'}
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
      spacing={'0.5rem'}
      sx={style[`contentMargin${messageOption}`]}
    >
      {!isPc ? null : messageOption === 'Normal' ? (
        <CuAvatar sx={style.dummyAvatar} />
      ) : (
        <CuAvatar
          src={target.userProfile}
          alt={target.userNickname}
          sx={style.targetAvatar}
        />
      )}
      <Box sx={isPc ? style.targetPc : style.targetMobile}>
        <Typography variant={'Body1'}>{message.content}</Typography>
      </Box>
      <MessageDate date={message.date} />
    </Stack>
  )
}
