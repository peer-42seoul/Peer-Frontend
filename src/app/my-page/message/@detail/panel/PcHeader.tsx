import { Stack, Typography } from '@mui/material'
import CuAvatar from '@/components/CuAvatar'
import * as style from './PcHeader.style'

const TARGETMESSAGE = '님과의 쪽지'

const PcHeader = ({
  targetProfile,
  userNickname,
}: {
  targetProfile: string | undefined
  userNickname: string
}) => {
  return (
    <Stack
      direction="row"
      alignItems={'center'}
      sx={style.pcHeader}
      spacing={'0.5rem'}
    >
      <CuAvatar
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
  )
}

export default PcHeader
