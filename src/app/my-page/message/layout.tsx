'use client'

import { ReactNode, useEffect } from 'react'
import useMessagePageState from '@/states/useMessagePageState'

interface IMessageLayoutProps {
  list: ReactNode
  detail: ReactNode
}

const MessageMain = ({ list, detail }: IMessageLayoutProps) => {
  const { messagePage, setListPage } = useMessagePageState()
  useEffect(() => {
    return () => {
      setListPage()
    }
  }, [])
  // TODO : #443에 추가된 페이지 레이아웃 디자인을 적용해야 함.
  return <>{messagePage === 'DETAIL' ? detail : list}</>
}

export default MessageMain
