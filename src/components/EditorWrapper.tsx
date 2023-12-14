// ToastEditorWrapper.tsx
import dynamic from 'next/dynamic'
import React from 'react'
import { Card } from '@mui/material'

interface Props {
  initialValue: string
}

const DynamicToastEditor = dynamic(
  () => import('./ToastUIEditor'), // ToastEditor 컴포넌트의 경로
  { ssr: false }, // 서버 사이드 렌더링 비활성화
)

const ToastEditorWrapper = (props: Props) => {
  return (
    <Card>
      <DynamicToastEditor {...props} />
    </Card>
  )
}

export default ToastEditorWrapper
