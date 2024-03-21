'use client'
import { Box } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'

interface ICuPhotoBoxProps {
  onClick?: () => void
  style?: React.CSSProperties
  imgStyle?: React.CSSProperties
  src: string
  alt: string
  objectStyle?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  priorityOption?: boolean
}

const CuPhotoBox = ({
  style,
  src,
  alt,
  priorityOption,
  objectStyle = 'cover',
  onClick,
  imgStyle,
}: ICuPhotoBoxProps) => {
  const [error, setError] = useState(false)
  return (
    <Box
      onClick={onClick}
      style={{
        width: '100%', // style에 width를 지정하지 않으면 이미지가 보이지 않음
        height: '100%', // style에 height를 지정하지 않으면 이미지가 보이지 않음
        ...style,
        position: 'relative',
        margin: 0,
        borderRadius: '0.5rem',
        ...(error && {
          backgroundColor: '#ffffff',
          border: '1px solid',
          borderColor: 'line.alternative',
        }),
      }}
    >
      {src && !error && (
        <Image
          src={src}
          alt={alt}
          fill
          style={{
            borderRadius: '0.5rem', // 모서리 둥굴게를 원하지 않으면 imgStyle에 borderRadius를 undefined로 설정
            ...imgStyle,
            objectFit: objectStyle,
          }}
          sizes="100%"
          priority={priorityOption}
          onError={() => setError(true)}
        />
      )}
    </Box>
  )
}

export default CuPhotoBox
