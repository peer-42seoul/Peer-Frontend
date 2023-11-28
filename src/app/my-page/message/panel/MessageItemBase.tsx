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

const MessageItemBase = ({ message }: { message: IMessageListData }) => {
  const { targetNickname, latestContent, targetProfile, unreadMsgNumber } =
    message
  return (
    <>
      <ListItemAvatar>
        <Avatar src={targetProfile} />
      </ListItemAvatar>
      <ListItemText primary={targetNickname} secondary={latestContent} />
      <ListItemSecondaryAction>
        <Stack alignItems={'flex-end'}>
          <Typography>
            {/* TODO : latestDate 데이터로 바꿀 것!!!!!!! */}
            {dayjs('2021-08-01T16:26:39.098').format('MM월 DD일')}
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
