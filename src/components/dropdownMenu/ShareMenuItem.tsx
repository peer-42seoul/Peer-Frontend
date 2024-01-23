'use client'

import React from 'react'
import IconMenuItem from './IconMenuItem'
import * as style from './dropdownMenu.styles'
import { ShareIcon } from '@/icons'

const ShareMenuItem = ({
  title,
  url,
  content,
  message, // handleClose,
}: {
  title: string
  url: string
  content: string
  message?: string // 클립보드에 복사할 메세지 ex) '피어에서 동료를 구해보세요! 이런 프로젝트가 있어요! ${url}'
  // handleClose: () => void
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
          text: content,
        })
        .catch((e) => {
          console.error(e)
        })
    } else {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(message || url)
          .then(() => alert('클립보드에 복사되었습니다.'))
          .catch((e) => {
            console.error(e)
          })
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
  return (
    <IconMenuItem
      action={handleShare}
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
