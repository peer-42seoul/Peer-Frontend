import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

interface ICuPhotoBoxProps {
  style?: React.CSSProperties
  src: string
  alt: string
  objectStyle?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' | 'false'
}

const CuPhotoBox = ({
  style,
  src,
  alt,
  objectStyle = 'cover',
}: ICuPhotoBoxProps) => {
  return (
    <Box
      style={{
        ...style,
        position: 'relative',
        margin: 0,
      }}
    >
      <Image src={src} alt={alt} layout="fill" objectFit={objectStyle} />
    </Box>
  )
}

export default CuPhotoBox
