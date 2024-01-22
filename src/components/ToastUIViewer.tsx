'use client'

import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import Viewer, {
  IViewerOptions,
} from '@toast-ui/editor/dist/toastui-editor-viewer'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'

/**
 * WARNING: SSR 환경에서 사용할 경우 충돌이 나기 때문에 실제 사용하기 위해서는 dynamic import로 불러오는 DynamicToastEditor를 사용해야 합니다.
 */

const ToastViewer = ({
  initialValue = '',
  height = '30rem',
  sx,
}: IViewerOptions) => {
  const viewerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!viewerRef.current) {
      return
    }

    const viewer = new Viewer({
      el: viewerRef.current,
      initialValue: initialValue,
      height: height,
    })

    return () => {
      viewer.destroy()
    }
  }, [initialValue, viewerRef])
  return <Box sx={sx} ref={viewerRef} color={'white'} />
}

export default ToastViewer
