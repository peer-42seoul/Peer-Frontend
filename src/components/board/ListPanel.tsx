import dayjs from 'dayjs'
import { Stack, Typography } from '@mui/material'
import * as style from './ListPanel.style'

interface IChildrenProps {
  children: React.ReactNode
}

interface IListItemProps {
  title: string
  authorNickname: string
  createdAt: Date
  onClick: () => void
}

export const ListPageContainer = ({ children }: IChildrenProps) => {
  return (
    <Stack sx={style.ListPageContainer} spacing={'2rem'}>
      {children}
    </Stack>
  )
}

export const ListBoxContainer = ({ children }: IChildrenProps) => {
  return (
    <Stack sx={style.ListBoxContainer} spacing={'1.5rem'}>
      {children}
    </Stack>
  )
}

export const ListStack = ({ children }: IChildrenProps) => {
  return (
    <Stack sx={style.ListStack} spacing={'1rem'}>
      {children}
    </Stack>
  )
}

export const ListItem = ({
  title,
  authorNickname,
  createdAt,
  onClick,
}: IListItemProps) => {
  return (
    <Stack sx={style.ListItem} onClick={onClick} spacing={'0.25rem'}>
      <Typography variant={'Body1'} color={'text.strong'}>
        {title}
      </Typography>
      <Stack direction={'row'} alignItems={'center'} spacing={'0.5rem'}>
        <Typography variant={'Body2'} color={'text.alternative'}>
          {authorNickname}
        </Typography>
        <Typography variant={'Caption'} color={'text.alternative'}>
          {dayjs(createdAt).format('MM월 DD일')}
        </Typography>
      </Stack>
    </Stack>
  )
}
