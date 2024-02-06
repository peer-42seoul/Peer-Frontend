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
  return (
    <Box
      sx={{
        ...sx,
        fontSize: '0.9375rem',
        backgroundColor: 'background.secondary',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        '& .toastui-editor-contents': {
          // 글자와 관련된 태그들을 최대한 다 넣어봤습니다.
          '& span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite,  del, dfn, em,  ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, section, summary, time, mark':
            {
              color: 'text.alternative',
            },
        },
      }}
      ref={viewerRef}
    />
  )
}

export default ToastViewer
