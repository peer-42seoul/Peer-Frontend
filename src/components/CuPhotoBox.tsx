import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

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
  return (
    <Box
      onClick={onClick}
      style={{
        ...style,
        position: 'relative',
        margin: 0,
      }}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: objectStyle }}
          sizes="100%"
          priority={priorityOption}
        />
      )}
    </Box>
  )
}

export default CuPhotoBox
