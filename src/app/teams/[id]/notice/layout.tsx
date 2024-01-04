'use client'
import { ReactNode, useEffect } from 'react'
import useTeamPageState from '@/states/useTeamPageState'

interface ITeamLayoutProps {
  list: ReactNode
  detail: ReactNode
  edit: ReactNode
}

const TeamNoticeMain = ({ list, detail, edit }: ITeamLayoutProps) => {
  const { boardType, resetState } = useTeamPageState()
  useEffect(() => {
    return () => {
      resetState()
    }
  }, [])
  console.log('boardType: ', boardType)
  if (boardType === 'EDIT') {
    return edit
  }
  if (boardType === 'DETAIL') {
    return detail
  }
  return list
}

export default TeamNoticeMain
