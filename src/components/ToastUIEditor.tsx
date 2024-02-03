'use client'

import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor, IToastEditorProps } from '@toast-ui/editor'
import { Card } from '@mui/material'
import { useTheme } from '@mui/material/styles'

/**
 * WARNING: SSR 환경에서 사용할 경우 충돌이 나기 때문에 실제 사용하기 위해서는 dynamic import로 불러오는 DynamicToastEditor를 사용해야 합니다.
 */

const ToastEditor = ({
  initialValue = '',
  initialEditType = 'wysiwyg',
  previewStyle = 'vertical',
  height = '30rem',
  editorRef,
}: IToastEditorProps) => {
  const themed = useTheme()
  const editorElementRef = useRef<HTMLDivElement>(null)
  const toggleDark = () => {
    const editorEl = editorElementRef.current?.getElementsByClassName(
      'toastui-editor-defaultUI',
    )[0]

    if (editorEl) {
      if (themed.palette.mode === 'dark') {
        editorEl.classList.add('toastui-editor-dark')
      } else {
        editorEl.classList.remove('toastui-editor-dark')
      }
    }
  }

  useEffect(() => {
    if (!editorElementRef.current) {
      return
    }

    editorRef.current = new Editor({
      el: editorElementRef.current,
      initialEditType: initialEditType,
      previewStyle: previewStyle,
      height: height,
      initialValue: initialValue,
    })
    toggleDark()

    // updateContent()
    return () => {
      editorRef.current?.destroy()
    }
  }, [initialValue])

  return (
    <Card
      sx={{
        backgroundColor: 'white',
        color: 'black',
        position: 'sticky',
        top: '0',
      }}
      ref={editorElementRef}
    />
  )
}

export default ToastEditor
