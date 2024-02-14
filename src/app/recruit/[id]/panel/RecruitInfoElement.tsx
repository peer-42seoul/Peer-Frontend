import { Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import { ProjectType, TPostStatus } from '@/types/IPostDetail'
import CuPhotoBox from '@/components/CuPhotoBox'

export const RecruitTitle = ({
  title,
  status,
}: {
  title: string
  status: TPostStatus | undefined
}) => {
  return (
    <Stack
      flexDirection={'row'}
      alignItems={'center'}
      gap={'1rem'}
      padding={'0.25rem'}
    >
      <Typography variant={'Title3'}>{title}</Typography>
      <Typography color={'yellow.strong'} variant={'Caption'}>
        {status === 'ONGOING'
          ? '모집중'
          : status === 'BEFORE'
            ? '모집전'
            : '모집완료'}
      </Typography>
    </Stack>
  )
}

export const TypeChip = ({ type }: { type: ProjectType }) => {
  return (
    <Chip
      label={type === 'STUDY' ? '스터디' : '프로젝트'}
      size="medium"
      sx={{
        backgroundColor: 'background.tertiary',
        borderRadius: 2,
        color: type === 'STUDY' ? 'yellow.strong' : 'green.normal',
      }}
    />
  )
}

export const RecruitImage = ({
  image,
  width,
  height,
  maxWidth,
}: {
  image: string
  width: string
  maxWidth?: string
  height: string
}) => {
  return (
    <CuPhotoBox
      src={image}
      alt="main_image"
      style={{
        width,
        height,
        maxWidth,
        borderRadius: '0.13rem',
      }}
    />
  )
}
