import React, { useState, useRef } from 'react'
import { IconButton } from '@mui/material'
import { SizeType } from '@/types/ITeamDnDLayout'
import Image from 'next/image'
import EditIcon from '@/icons/EditIcon'
import PictureIcon from '@/icons/PictureIcon'
import * as style from './ImageWidget.style'
import WidgetCard from './WidgetCard'

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
    <WidgetCard contentSx={style.CardContentStyle}>
      <div
        style={style.ContentDivStyle}
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
            <div style={style.ButtonDivStyle}>
              <IconButton
                aria-label="edit"
                sx={{
                  ...style.IconButtonStyle,
                  display: iconHidden ? 'none' : '',
                }}
                onClick={() => inputRef.current?.click()}
              >
                <EditIcon sx={{ color: 'text.strong' }} />
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
              <PictureIcon sx={{ color: 'text.assistive' }} />
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
    </WidgetCard>
  )
}
export default ImageWidget
