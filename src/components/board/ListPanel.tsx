import { Stack } from '@mui/material'
import * as style from './ListPanel.style'

interface IChildrenProps {
  children: React.ReactNode
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
