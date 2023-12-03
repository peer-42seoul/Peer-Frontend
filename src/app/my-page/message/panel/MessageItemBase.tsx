import dayjs from 'dayjs'
import {
  Avatar,
  Chip,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { IMessageListData } from '@/types/IMessage'
import UTCtoLocalTime from '@/utils/UTCtoLocalTime'

const MessageItemBase = ({ message }: { message: IMessageListData }) => {
  const {
    targetNickname,
    latestContent,
    targetProfile,
    unreadMsgNumber,
    latestDate,
  } = message
  return (
    <>
      <ListItemAvatar>
        <Avatar src={targetProfile} />
      </ListItemAvatar>
      <ListItemText primary={targetNickname} secondary={latestContent} />
      <ListItemSecondaryAction>
        <Stack alignItems={'flex-end'}>
          <Typography>
            {dayjs(UTCtoLocalTime(latestDate)).format('MM월 DD일')}
          </Typography>
          <Chip
            label={
              unreadMsgNumber > 0
                ? unreadMsgNumber > 99
                  ? '99+'
                  : unreadMsgNumber
                : null
            }
          />
        </Stack>
      </ListItemSecondaryAction>
    </>
  )
}

export default MessageItemBase
