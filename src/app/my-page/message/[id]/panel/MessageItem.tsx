import { Avatar, Box, Stack, Typography } from '@mui/material'
import { IMessage, IMessageUser } from '@/types/IMessage'

type TMarginType = 'Top' | 'First' | 'NotFirst'
interface IOwnerMessageItemProps {
  message: IMessage
  marginType: TMarginType
}
interface ITargetMessageItemProps {
  message: IMessage
  marginType: TMarginType
  target: IMessageUser
}

export const OwnerMessageItem = ({
  message,
  marginType,
}: IOwnerMessageItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Stack sx={{ bgcolor: '#EFEFEF', alignItems: 'flex-end' }}>
        <Typography>{message.content}</Typography>
        <Typography>{message.date}</Typography>
      </Stack>
    </Box>
  )
}

export const TargetMessageItem = ({
  message,
  target,
  marginType,
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
