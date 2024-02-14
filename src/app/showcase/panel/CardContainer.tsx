'use client'
import React from 'react'
import useMedia from '@/hook/useMedia'
import { Stack, Typography } from '@mui/material'
import * as cardStyle from './ShowcaseCard.style'
import * as containerStyle from './CardContainer.style'
import CardStack from './CardStack'
import { ICardData } from '@/app/showcase/panel/types'
import { BetaIcon } from '@/components/BetaBadge'

const CardContainer = ({
  cardList,
  removeCard,
  message,
  addCard,
}: {
  cardList: Array<ICardData>
  removeCard: (recruit_id: number) => void
  message: string
  addCard?: () => void
}) => {
  const { isPc } = useMedia()
  return (
    <Stack
      justifyContent={'center'}
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
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        spacing={'0.25rem'}
        sx={containerStyle.gnbContainerStyle}
      >
        <Typography component={'h4'} sx={containerStyle.gnbTypographyStyle}>
          쇼케이스
        </Typography>
        <BetaIcon />
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
          <CardStack
            cardList={cardList}
            removeCard={removeCard}
            addCard={addCard}
          />
        ) : (
          <Typography variant="CaptionEmphasis">{message}</Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default CardContainer
