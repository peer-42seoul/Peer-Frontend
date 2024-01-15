'use client'
import React from 'react'
import useMedia from '@/hook/useMedia'
import { FormControlLabel, Stack, Typography } from '@mui/material'
import CuTypeToggle from '@/components/CuTypeToggle'
import Interest from './Interest'
import * as cardStyle from './HitchhikingCard.style'
import * as containerStyle from './CardContainer.style'
import CardStack from './CardStack'
import { ICardData } from '@/app/showcase_ref/panel/types'

const CardContainer = ({
  cardList,
  removeCard,
  isProject,
  message,
  handleChange,
}: {
  cardList: Array<ICardData>
  removeCard: (recruit_id: number) => void
  isProject: boolean
  message: string
  handleChange: any
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
        sx={containerStyle.toggleContainerStyle}
        justifyContent={'center'}
        alignItems={'center'}
        direction={'row'}
        spacing={'0.5rem'}
      >
        <FormControlLabel
          control={<CuTypeToggle checked={isProject} onChange={handleChange} />}
          label={''}
        />
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
            isProject={isProject}
          />
        ) : (
          <Typography variant="CaptionEmphasis">{message}</Typography>
        )}
      </Stack>
      <Interest id={cardList[cardList.length - 1]?.id} />
    </Stack>
  )
}

export default CardContainer
