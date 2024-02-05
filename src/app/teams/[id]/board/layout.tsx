'use client'
import { ReactNode, useEffect } from 'react'
import useTeamPageState from '@/states/useTeamPageState'

interface ITeamLayoutProps {
  list: ReactNode
  detail: ReactNode
  edit: ReactNode
  setting: ReactNode
}

const TeamBoardMain = ({ list, detail, edit, setting }: ITeamLayoutProps) => {
  const { boardType, resetState } = useTeamPageState()
  useEffect(() => {
    return () => {
      resetState()
    }
  }, [])
  if (boardType === 'EDIT') {
    return edit
  }
  if (boardType === 'DETAIL') {
    return detail
  }
  if (boardType === 'SETTING') {
    return setting
  }
  return list
}

export default TeamBoardMain
