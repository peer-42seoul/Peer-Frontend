'use client'
import { Stack, Box, Typography } from '@mui/material'
import React from 'react'
import LabelWithIcon from '../LabelWithIcon'
import ImageIcon from '@/icons/ImageIcon'
import ImageUploadButton from '@/components/ImageUploadButton'
import * as Style from './SkillInput.style'

/* eslint-disable no-unused-vars */
const ImageInput = ({
  previewImage,
  setPreviewImage,
  setImage,
  image,
}: {
  previewImage: string
  image: File[]
  setPreviewImage: (image: string) => void
  setImage: (image: File[]) => void
}) => {
  return (
    <Stack direction={'column'} spacing={'0.5rem'} alignItems={'flex-start'}>
      <LabelWithIcon
        svgIcon={<ImageIcon sx={Style.IconStyle} />}
        message={'쇼케이스 대표 이미지'}
      />
      <ImageUploadButton
        setImage={(image: File[]) => {
          setImage(image)
        }}
        setPreviewImage={setPreviewImage}
      >
        {previewImage ? (
          <Box
            component={'img'}
            alt="쇼캐이스 대표 이미지"
            src={image ? previewImage : '/images/teamLogo.png'}
            sx={Style.ShowcaseImageStyle}
          />
        ) : (
          <Box
            sx={{
              ...Style.ShowcaseImageStyle,
              position: 'relative',
              backgroundColor: 'background.tertiary',
            }}
          >
            <Typography
              variant={'Body1'}
              sx={{
                color: 'text.normal',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
              }}
            >
              클릭해서 이미지를
              <br />
              업로드하세요
            </Typography>
          </Box>
        )}
      </ImageUploadButton>
    </Stack>
  )
}

export default ImageInput
