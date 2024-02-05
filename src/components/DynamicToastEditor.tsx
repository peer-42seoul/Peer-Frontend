// ToastEditorWrapper.tsx
import dynamic from 'next/dynamic'
import React from 'react'
import { Box } from '@mui/material'
import { IToastEditorProps } from '@toast-ui/editor'

interface Props extends IToastEditorProps {
  theme?: string
}

const ToastEditor = dynamic(
  () => import('./ToastUIEditor'), // ToastEditor 컴포넌트의 경로
  { ssr: false }, // 서버 사이드 렌더링 비활성화
)

/**
 * SSR 환경에서 발생하는 충돌을 막기 위해서 dynamic import로 ToastEditor를 불러오는 컴포넌트
 */
const DynamicToastEditor = (props: Props) => {
  return (
    <Box>
      <ToastEditor {...props} />
    </Box>
  )
}

export default DynamicToastEditor
