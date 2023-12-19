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
  return (
    // <Container sx={{ height: '90vh', padding: 0 }}>
    <>{messagePage === 'DETAIL' ? detail : list}</>
    // </Container>
  )
}

export default MessageMain
