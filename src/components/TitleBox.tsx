'use client'
import useMedia from '@/hook/useMedia'
import { Stack, StackProps, Typography, TypographyProps } from '@mui/material'
import React from 'react'
import * as style from './TitleBox.style'

const MessageWidget = ({
  title,
  titleComponent, // titleComponent가 있으면 title을 무시합니다.
  children,
  StackProps,
  TitleTypographyProps,
}: {
  title: string
  titleComponent?: React.ReactNode
  children: React.ReactNode
  StackProps?: StackProps
  TitleTypographyProps?: TypographyProps
}) => {
  const { isPc } = useMedia()

  return (
    <Stack
      spacing={isPc ? '1.5rem' : '1rem'}
      sx={{
        ...(isPc ? style.messageWidgetPcStyle : style.messageWidgetMobileStyle),
      }}
      {...StackProps}
    >
      {titleComponent ? (
        titleComponent
      ) : (
        <Stack
          direction={'row'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          height={'2.5rem'}
        >
          <Typography
            variant={isPc ? 'Title3Emphasis' : 'Body1Emphasis'}
            component={'h3'}
            {...TitleTypographyProps}
          >
            {title}
          </Typography>
        </Stack>
      )}
      {children}
    </Stack>
  )
}

export default MessageWidget
