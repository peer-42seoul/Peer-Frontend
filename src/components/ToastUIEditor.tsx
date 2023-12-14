'use client'

import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/editor'
import { Card } from '@mui/material'

interface Props {
  initialValue: string
}

const ToastEditor = ({ initialValue }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    const editor = new Editor({
      el: editorRef.current,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '30rem',
      initialValue: initialValue,
    })

    return () => {
      editor.destroy()
    }
  }, [initialValue])

  return (
    <Card sx={{ backgroundColor: 'white', color: 'black' }} ref={editorRef} />
  )
}

export default ToastEditor
