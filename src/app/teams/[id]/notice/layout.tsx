'use client'
import { ReactNode } from 'react'
import useTeamPageState from '@/states/useTeamPageState'

interface ITeamLayoutProps {
  list: ReactNode
  detail: ReactNode
  edit: ReactNode
}

const TeamNoticeMain = ({ list, detail, edit }: ITeamLayoutProps) => {
  const { boardType } = useTeamPageState()
  if (boardType === 'EDIT') {
    return edit
  }
  if (boardType === 'DETAIL') {
    return detail
  }
  return list
}

export default TeamNoticeMain
