'use client'
import React from 'react'
import useMedia from '@/hook/useMedia'
import { Stack, Typography } from '@mui/material'
import * as cardStyle from './ShowcaseCard.style'
import * as containerStyle from './CardContainer.style'
import CardStack from './CardStack'
import { ICardData } from '@/app/showcase/panel/types'

const CardContainer = ({
  cardList,
  removeCard,
  message,
}: {
  cardList: Array<ICardData>
  removeCard: (recruit_id: number) => void
  message: string
}) => {
  const { isPc } = useMedia()
  return (
    <Stack
      justifyContent={'flex-start'}
      alignItems={'center'}
      sx={
        isPc
          ? containerStyle.cardContainerPCStyle
          : containerStyle.cardContainerMobileStyle
      }
      direction={'column'}
      spacing={'2rem'}
    >
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        sx={containerStyle.gnbContainerStyle}
      >
        <Typography component={'h4'} sx={containerStyle.gnbTypographyStyle}>
          쇼케이스
        </Typography>
      </Stack>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          ...(isPc ? cardStyle.cardPcSize : cardStyle.cardMobileSize),
          position: 'relative',
        }}
      >
        {!message ? (
          <CardStack cardList={cardList} removeCard={removeCard} />
        ) : (
          <Typography variant="CaptionEmphasis">{message}</Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default CardContainer
