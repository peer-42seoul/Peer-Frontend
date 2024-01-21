'use client'

import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor, IEditorOptions } from '@toast-ui/editor'
import { Card } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useShowCaseState from '@/states/useShowCaseState'

/**
 * WARNING: SSR 환경에서 사용할 경우 충돌이 나기 때문에 실제 사용하기 위해서는 dynamic import로 불러오는 DynamicToastEditor를 사용해야 합니다.
 */

const FormUIEditor = ({
  initialValue,
  initialEditType = 'wysiwyg',
  previewStyle = 'vertical',
  height = '30rem',
}: IEditorOptions) => {
  const { setContent } = useShowCaseState()
  const themed = useTheme()
  const editorRef = useRef<HTMLDivElement>(null)
  const CONTENT_MAX = 100000
  const toggleDark = () => {
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
  }
  const editor = useRef<Editor | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    editor.current = new Editor({
      el: editorRef.current,
      initialEditType: initialEditType,
      previewStyle: previewStyle,
      height: height,
      initialValue,
    })
    toggleDark()

    updateContent()
    return () => {
      editor.current?.destroy()
    }
  }, [initialValue])

  const updateContent = () => {
    if (editor.current) {
      editor.current.on('change', () => {
        if (editor.current) {
          const content = editor.current?.getMarkdown()
          if (content.length > CONTENT_MAX) {
            alert(`최대 ${CONTENT_MAX}자까지 입력 가능합니다.`)
            return
          }
          setContent(content)
        }
      })
    }
  }

  return (
    <Card
      sx={{
        backgroundColor: 'white',
        color: 'black',
        position: 'sticky',
        top: '0',
      }}
      ref={editorRef}
    />
  )
}

export default FormUIEditor
