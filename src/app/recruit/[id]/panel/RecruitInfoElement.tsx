import { Box, Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import { ProjectType, TPostStatus } from '@/types/IPostDetail'

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
}: {
  image: string
  width: string
  height: string
}) => {
  return (
    <Box
      src={image}
      alt="main_image"
      width={width}
      height={height}
      component={'img'}
      borderRadius={'0.13rem'}
      sx={{
        objectFit: 'cover',
      }}
    />
  )
}
