import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

interface ICuPhotoBoxProps {
  style?: React.CSSProperties
  src: string
  alt: string
}

const CuPhotoBox = ({ style, src, alt }: ICuPhotoBoxProps) => {
  return (
    <Box
      style={{
        ...style,
        position: 'relative',
        margin: 0,
      }}
    >
      <Image src={src} alt={alt} layout="fill" objectFit="cover" />
    </Box>
  )
}

export default CuPhotoBox
