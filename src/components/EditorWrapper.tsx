// ToastEditorWrapper.tsx
import dynamic from 'next/dynamic'
import React from 'react'

interface Props {
  initialValue: string
  initialEditType?: string
  previewStyle?: string
  height?: string
  theme?: string
}

const DynamicToastEditor = dynamic(
  () => import('./ToastUIEditor'), // ToastEditor 컴포넌트의 경로
  { ssr: false }, // 서버 사이드 렌더링 비활성화
)

const ToastEditorWrapper = (props: Props) => {
  return <DynamicToastEditor {...props} />
}

export default ToastEditorWrapper
