import useMedia from '@/hook/useMedia'
import { Avatar, Stack, Typography } from '@mui/material'
import * as style from './MessageHeader.style'

const TARGETMESSAGE = '님과의 쪽지'

const MessageHeader = ({
  targetProfile,
  userNickname,
}: {
  targetProfile: string | undefined
  userNickname: string
}) => {
  const { isPc } = useMedia()

  return isPc ? (
    <Stack
      direction="row"
      alignItems={'center'}
      sx={style.pcHeader}
      spacing={'0.5rem'}
    >
      <Avatar
        sx={style.headerAvatar}
        alt="Message Target"
        src={targetProfile}
      />
      <Stack direction={'row'} alignItems={'flex-end'} spacing={'0.5rem'}>
        <Typography lineHeight="150%" variant="Title3">
          {userNickname}
        </Typography>
        <Typography lineHeight="150%" variant="Body2" color="text.alternative">
          {TARGETMESSAGE}
        </Typography>
      </Stack>
    </Stack>
  ) : (
    <></>
  )
}

export default MessageHeader
