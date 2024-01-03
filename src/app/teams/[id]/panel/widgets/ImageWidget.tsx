import React, { useState, useRef } from 'react'
import { Card, CardContent, IconButton } from '@mui/material'
import { SizeType } from '@/types/ITeamDnDLayout'
import Image from 'next/image'
import EditIcon from '@/icons/EditIcon'
import PictureIcon from '@/icons/PictureIcon'

const ImageWidget = ({ data, size }: { data: any; size: SizeType }) => {
  const [iconHidden, setIconHidden] = useState<boolean>(true)
  const [uploadedImage, setUploadedImage] = useState<
    string | ArrayBuffer | null
  >(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0 && size) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            setUploadedImage(e.target.result)
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'background.tertiary',
        padding: '0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '1rem',
      }}
    >
      <CardContent
        sx={{
          height: 'calc(100% - 2px)',
          padding: '1px',
          '&:last-child': {
            paddingBottom: '1px',
          },
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={() => setIconHidden(false)}
          onMouseLeave={() => setIconHidden(true)}
        >
          {uploadedImage || data ? (
            <div>
              <Image
                src={uploadedImage || data}
                alt="UploadedImage"
                layout="fill"
                objectFit="cover"
                style={{
                  borderRadius: '1rem',
                }}
              />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                <IconButton
                  aria-label="edit"
                  sx={{
                    backgroundColor: 'text.assistive',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    visibility: iconHidden ? 'hidden' : 'visible',
                    '&:hover': {
                      backgroundColor: 'text.assistive',
                    },
                  }}
                  onClick={() => inputRef.current?.click()}
                >
                  <EditIcon />
                </IconButton>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          ) : (
            <>
              <IconButton
                onClick={() => inputRef.current?.click()}
                sx={{ p: '2rem' }}
              >
                <PictureIcon />
              </IconButton>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
export default ImageWidget
