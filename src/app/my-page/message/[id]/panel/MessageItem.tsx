import { Avatar, Box, Stack, Typography } from '@mui/material'
import { IMessage, IMessageUser } from '@/types/IMessage'

const OwnerMessageItem = ({ message }: { message: IMessage }) => {
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

const TargetMessageItem = ({
  message,
  target,
}: {
  message: IMessage
  target: IMessageUser
}) => {
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

interface IMessageItemProps {
  msg: IMessage
  owner: IMessageUser
  target: IMessageUser
}

const MessageItem = ({ msg, owner, target }: IMessageItemProps) => {
  return (
    <>
      {msg.userId === owner.userId ? (
        <OwnerMessageItem message={msg} />
      ) : (
        <TargetMessageItem message={msg} target={target} />
      )}
    </>
  )
}

export default MessageItem
