import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import CuAvatar from '@/components/CuAvatar'
import { IMessageTarget } from '@/types/IMessage'
import * as style from './TargetList.style'

interface ITargetItemProps {
  messgeTarget: IMessageTarget
  setTargetUser: (targetUser: IMessageTarget) => void
  resetMessageList: () => void
}

const TargetItem = ({
  messgeTarget,
  setTargetUser,
  resetMessageList,
}: ITargetItemProps) => {
  const { targetEmail, targetNickname, targetProfile } = messgeTarget

  return (
    <ListItem disablePadding sx={style.listItem}>
      <ListItemButton
        onClick={() => {
          setTargetUser(messgeTarget)
          resetMessageList()
        }}
        disableGutters
        sx={style.listItemButton}
      >
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <CuAvatar src={targetProfile} sx={style.avatar} />
          <ListItemText
            primary={targetNickname}
            primaryTypographyProps={{
              variant: 'Body1',
              color: 'text.normal',
            }}
            secondary={targetEmail}
            secondaryTypographyProps={{
              variant: 'Body2',
              color: 'text.alternative',
            }}
          />
        </Stack>
      </ListItemButton>
    </ListItem>
  )
}

interface ITargetListProps {
  messageTargetState: {
    targetList: IMessageTarget[] | undefined
    resetList: () => void
  }
  setTargetUser: (targetUser: IMessageTarget) => void
}

const TargetList = ({
  messageTargetState,
  setTargetUser,
}: ITargetListProps) => {
  const { targetList, resetList } = messageTargetState
  if (!targetList) return null
  return (
    <List disablePadding sx={style.targetList}>
      {targetList.length === 0 ? (
        <Typography variant={'Body2'} color={'text.alternative'}>
          검색된 유저가 없어요.
        </Typography>
      ) : (
        targetList.map((target: IMessageTarget) => (
          <TargetItem
            key={target.targetId}
            messgeTarget={target}
            setTargetUser={setTargetUser}
            resetMessageList={resetList}
          />
        ))
      )}
    </List>
  )
}

export default TargetList
