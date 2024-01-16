'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import { IEditorOptions } from '@toast-ui/editor'
import { Card, useTheme } from '@mui/material'
import useEditorState from '@/states/useEditorState'

/**
 * WARNING: SSR 환경에서 사용할 경우 충돌이 나기 때문에 실제 사용하기 위해서는 dynamic import로 불러오는 DynamicToastEditor를 사용해야 합니다.
 */

const ToastEditor = ({
  initialValue = '',
  initialEditType = 'wysiwyg',
  previewStyle = 'vertical',
  height = '30rem',
}: IEditorOptions) => {
  const themed = useTheme()
  const editorRef = useRef<HTMLDivElement>(null)
  const toggleDark = useCallback(() => {
    const editorEl = editorRef.current?.getElementsByClassName(
      'toastui-editor-defaultUI',
    )[0]

    if (editorEl) {
      if (themed.palette.mode === 'dark') {
        editorEl.classList.add('toastui-editor-dark')
      } else {
        editorEl.classList.remove('toastui-editor-dark')
      }
    }
  }, [editorRef, themed.palette.mode])
  const { editor, setEditor, resetEditor } = useEditorState()

  useEffect(() => {
    if (!editorRef.current) {
      return
    }
    setEditor({
      el: editorRef.current,
      initialEditType: initialEditType,
      previewStyle: previewStyle,
      height: height,
      initialValue: initialValue,
    })
    toggleDark()
    return () => {
      editor?.destroy()
      resetEditor()
    }
  }, [editorRef, initialEditType, previewStyle, height, initialValue])

  return (
    <Card sx={{ backgroundColor: 'white', color: 'black' }} ref={editorRef} />
  )
}

export default ToastEditor
