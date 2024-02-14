'use client'

import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import { Editor, IToastEditorProps } from '@toast-ui/editor'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useAxiosWithAuth from '@/api/config'

/**
 * WARNING: SSR 환경에서 사용할 경우 충돌이 나기 때문에 실제 사용하기 위해서는 dynamic import로 불러오는 DynamicToastEditor를 사용해야 합니다.
 */

const ToastEditorAdmin = ({
  initialValue = '',
  initialEditType = 'wysiwyg',
  previewStyle = 'vertical',
  height = '30rem',
  editorRef,
}: IToastEditorProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const API_URL = process.env.NEXT_PUBLIC_CSR_API
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

      hooks: {
        addImageBlobHook: async (
          blob: Blob,
          callback: (url: string, text: string) => void,
        ) => {
          const formData = new FormData()
          formData.append('image', blob)
          try {
            const response = await axiosWithAuth.post(
              `${API_URL}/api/v1/admin/editor/image`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            )
            callback(response.data, '이미지 대체 텍스트')
          } catch (error) {
            console.error('이미지 업로드 실패', error)
          }
        },
      },
    })

    toggleDark()

    // updateContent()
    return () => {
      editorRef.current?.destroy()
    }
  }, [initialValue])

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        color: 'black',
        position: 'sticky',
        top: '0',
        width: '100%',
        '& .toastui-editor-dropdown-toolbar': {
          height: ['fit-content', undefined],
          flexWrap: 'wrap',
        },
        '& .toastui-editor-popup': {
          position: 'absolute',
          top: ' 0 !important',
          right: 0,
          left: 'auto !important',
        },
      }}
      ref={editorElementRef}
    />
  )
}

export default ToastEditorAdmin
