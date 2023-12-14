import dayjs from 'dayjs'
import { Box, Chip, ListItemText, Stack, Typography } from '@mui/material'
import { IMessageListData } from '@/types/IMessage'
import UTCtoLocalTime from '@/utils/UTCtoLocalTime'
import CuAvatar from '@/components/CuAvatar'
import * as style from './MessageItemBase.style'

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
      <CuAvatar sx={style.pcAvatar} src={targetProfile} />
      <ListItemText
        primary={targetNickname}
        primaryTypographyProps={{
          variant: 'Body2',
          color: 'text.normal',
          sx: style.listItemText,
        }}
        secondary={latestContent}
        secondaryTypographyProps={{
          variant: 'Body1',
          color: 'text.alternative',
          sx: style.listItemText,
        }}
      />
      <Stack
        height={'100%'}
        alignItems={'flex-end'}
        justifyContent={'space-between'}
        spacing={'0.37rem'}
      >
        <Typography
          sx={style.dateText}
          variant={'Caption'}
          color={'text.assistive'}
        >
          {dayjs(UTCtoLocalTime(latestDate)).format('MM월 DD일')}
        </Typography>
        {unreadMsgNumber > 0 ? (
          <Chip
            sx={style.chip}
            label={unreadMsgNumber}
            size={'small'}
            color={'primary'}
          />
        ) : (
          <Box sx={style.chip}></Box>
        )}
      </Stack>
    </>
  )
}

export default MessageItemBase
