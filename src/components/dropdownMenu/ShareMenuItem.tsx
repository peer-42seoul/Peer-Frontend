'use client'

import React from 'react'
import IconMenuItem from './IconMenuItem'
import * as style from './dropdownMenu.styles'
import { ShareIcon } from '@/icons'

interface IShareProps {
  title: string
  url: string
  content: string
  message?: string
}

export const handleShare = (
  title: string,
  url: string,
  content: string,
  message?: string,
) => {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        url: url,
        text: content,
      })
      .catch(() => {})
  } else {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(message || url)
        .then(() => alert('클립보드에 복사되었습니다.'))
        .catch(() => {})
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = message || url
      textarea.id = 'temp'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('클립보드에 복사되었습니다.')
    }
  }
}

const ShareMenuItem = ({
  title,
  url,
  content,
  message, // handleClose,
}: IShareProps) => {
  return (
    <IconMenuItem
      action={() => handleShare(title, url, content, message)}
      icon={
        <ShareIcon
          sx={{
            ...style.menuItemIconStyleBase,
            padding: '0.125rem',
            color: 'text.alternative',
          }}
        />
      }
      text={'공유'}
    />
  )
}

export default ShareMenuItem
