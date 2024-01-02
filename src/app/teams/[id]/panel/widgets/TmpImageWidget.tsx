import React, { useState, useRef } from 'react'
import { Card, CardContent, Button } from '@mui/material'
import { SizeType } from '@/types/ITeamDnDLayout'
import Image from 'next/image'

/* 임시 위젯 */
const TmpImageWidget = ({ data, size }: { data: any; size: SizeType }) => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setUploadedImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'tertiary',
        position: 'relative',
      }}
    >
      <CardContent
        sx={{
          width: '100%',
          height: '100%',
          padding: '0.5rem 0.5rem 0.5rem 0.5rem',
        }}
      >
        {data || uploadedImage ? (
          <Image
            src={data || uploadedImage}
            alt="Uploaded"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <>
            <Button
              variant="contained"
              onClick={() => inputRef.current?.click()}
            >
              Upload Image
            </Button>
            <input
              ref={inputRef}
              type="file"
              hidden
              onChange={handleImageUpload}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
export default TmpImageWidget
