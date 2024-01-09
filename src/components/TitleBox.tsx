'use client'
import useMedia from '@/hook/useMedia'
import { Stack, SxProps, Typography } from '@mui/material'
import React from 'react'
import * as style from './TitleBox.style'

const TitleBox = ({
  title,
  titleEndAdornment, // titleEndAdornment는 titleComponent가 없을 때만 작동합니다.
  titleComponent, // titleComponent가 있으면 title을 무시합니다.
  children,
  titleBoxSx,
  titleSx,
  titleContainerSx,
  titleBoxSpacing,
}: {
  title: string
  titleComponent?: React.ReactNode
  titleEndAdornment?: React.ReactNode
  children: React.ReactNode
  titleBoxSx?: SxProps
  titleSx?: SxProps
  titleContainerSx?: SxProps
  titleBoxSpacing?: number | string | Array<number | string>
}) => {
  const { isPc } = useMedia()

  return (
    <Stack
      spacing={titleBoxSpacing || (isPc ? '1.5rem' : '1rem')}
      sx={
        titleBoxSx || (isPc ? style.titleBoxPcStyle : style.titleBoxMobileStyle)
      }
    >
      {titleComponent ? (
        titleComponent
      ) : (
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          height={'2.5rem'}
          sx={titleContainerSx}
        >
          <Typography
            variant={isPc ? 'Title3Emphasis' : 'Body1Emphasis'}
            component={'h3'}
            sx={titleSx}
          >
            {title}
          </Typography>
          {titleEndAdornment}
        </Stack>
      )}
      {children}
    </Stack>
  )
}

export default TitleBox
