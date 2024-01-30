'use client'
import { Stack, Box, Typography } from '@mui/material'
import React from 'react'
import LabelWithIcon from '../LabelWithIcon'
import ImageIcon from '@/icons/ImageIcon'
import ImageUploadButton from '@/components/ImageUploadButton'
import * as Style from './SkillInput.style'
import useMedia from '@/hook/useMedia'
import Image from 'next/image'

/* eslint-disable no-unused-vars */
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
  const { isPc } = useMedia()

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
          <Image src={previewImage} alt="쇼케이스 대표 이미지" fill={true} />
        ) : (
          <Box
            sx={{
              ...Style.ShowcaseImageStyle(isPc),
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
