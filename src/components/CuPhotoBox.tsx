'use client'
import { Box } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'

interface ICuPhotoBoxProps {
  onClick?: () => void
  style?: React.CSSProperties
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
}: ICuPhotoBoxProps) => {
  const [error, setError] = useState(false)
  return (
    <Box
      onClick={onClick}
      style={{
        ...style,
        position: 'relative',
        margin: 0,
        backgroundColor: '#ffffff',
        border: '1px solid',
        borderColor: 'line.alternative',
      }}
    >
      {src && !error && (
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: objectStyle }}
          sizes="100%"
          priority={priorityOption}
          onError={() => setError(true)}
        />
      )}
    </Box>
  )
}

export default CuPhotoBox
