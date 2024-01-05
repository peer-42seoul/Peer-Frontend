'use client'
import useMedia from '@/hook/useMedia'
import { Stack, StackProps, Typography, TypographyProps } from '@mui/material'
import React from 'react'
import * as style from './MessageWidget.style'

const MessageWidget = ({
  title,
  children,
  StackProps,
  TitleTypographyProps,
}: {
  title: string
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
      {children}
    </Stack>
  )
}

export default MessageWidget
