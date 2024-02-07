'use client'
import { Stack, Box, Button } from '@mui/material'
import React from 'react'
import LabelWithIcon from '../../../../components/LabelWithIcon'
import ImageIcon from '@/icons/ImageIcon'
import ImageUploadButton from '@/components/ImageUploadButton'
import * as Style from './SkillInput.style'
import Image from 'next/image'

const ImageInput = ({
  previewImage,
  setPreviewImage, // setImage,
  setImage, // image,
}: {
  previewImage: string
  setPreviewImage: (image: string) => void
  image: File[]
  setImage: (image: File[]) => void
}) => {
  return (
    <Stack direction={'column'} spacing={'0.5rem'} alignItems={'flex-start'}>
      <LabelWithIcon
        svgIcon={<ImageIcon sx={Style.IconStyle} />}
        message={'쇼케이스 대표 이미지'}
      />
      <Stack sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        {previewImage && (
          <Box
            style={{
              position: 'relative',
              maxWidth: '26rem',
              width: '100%',
              height: 300,
              margin: 0,
            }}
          >
            <Image
              src={previewImage}
              alt="쇼케이스 대표 이미지"
              layout="fill"
            />
          </Box>
        )}
        <ImageUploadButton
          setImage={(image: File[]) => {
            setImage(image)
          }}
          setPreviewImage={setPreviewImage}
          sx={{ color: 'primary' }}
        >
          <Stack
            direction={'column'}
            spacing={'0.5rem'}
            sx={{ width: ['100%', '26rem'] }}
          >
            <Button
              component="div"
              variant="outlined"
              // startIcon={<Icon.PlusIcon color={'primary'} />}
              sx={{ width: ['100%', '26rem'] }}
              color={'primary'}
            >
              대표이미지 등록
            </Button>
          </Stack>
        </ImageUploadButton>
      </Stack>
    </Stack>
  )
}

export default ImageInput
