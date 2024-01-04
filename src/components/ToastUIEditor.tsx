'use client'

import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/editor'
import { Card } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface Props {
  initialValue: string
  initialEditType?: string
  previewStyle?: string
  height?: string
}

const ToastEditor = ({
  initialValue,
  initialEditType = 'markdown',
  previewStyle = 'vertical',
  height = '30rem',
}: Props) => {
  const themed = useTheme()
  const editorRef = useRef<HTMLDivElement>(null)

  const toggleDark = () => {
    const editorEl = editorRef.current?.getElementsByClassName(
      'toastui-editor-defaultUI',
    )[0]

    if (editorEl) {
      console.log(themed.palette.mode)
      if (themed.palette.mode === 'dark') {
        editorEl.classList.add('toastui-editor-dark')
      } else {
        editorEl.classList.remove('toastui-editor-dark')
      }
    }
  }

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    const editor = new Editor({
      el: editorRef.current,
      initialEditType: initialEditType,
      previewStyle: previewStyle,
      height: height,
      initialValue: initialValue,
    })

    toggleDark()

    return () => {
      editor.destroy()
    }
  }, [initialValue, themed.palette.mode, toggleDark])

  return (
    <Card sx={{ backgroundColor: 'white', color: 'black' }} ref={editorRef} />
  )
}

export default ToastEditor
