import { Avatar, Stack, Typography } from '@mui/material'
import { IMessageTarget } from '@/types/IMessage'

interface ITargetItemProps {
  messgeTarget: IMessageTarget
  setTargetUser: (targetUser: IMessageTarget) => void
}

const TargetItem = ({ messgeTarget, setTargetUser }: ITargetItemProps) => {
  const { targetEmail, targetNickname, targetProfile } = messgeTarget

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={1}
      sx={{ cursor: 'pointer' }}
      onClick={() => {
        setTargetUser(messgeTarget)
      }}
    >
      <Avatar src={targetProfile} />
      <Typography>{`${targetNickname} (${targetEmail})`}</Typography>
    </Stack>
  )
}

interface ITargetListProps {
  messageTargetList: IMessageTarget[]
  setTargetUser: (targetUser: IMessageTarget) => void
}

const TargetList = ({ messageTargetList, setTargetUser }: ITargetListProps) => {
  return (
    <Stack>
      {messageTargetList.length === 0 ? (
        <Typography>검색 결과가 없습니다.</Typography>
      ) : (
        messageTargetList.map((target: IMessageTarget) => (
          <TargetItem
            key={target.targetId}
            messgeTarget={target}
            setTargetUser={setTargetUser}
          />
        ))
      )}
    </Stack>
  )
}

export default TargetList
