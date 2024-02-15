'use client'

import React, { Dispatch, SetStateAction } from 'react'
import useMedia from '@/hook/useMedia'
import { IconButton, Stack, Typography } from '@mui/material'
import * as containerStyle from './CardContainer.style'
import * as style from '../showcase.style'
import CardStack from './CardStack'
import { ICardData } from '@/app/showcase/panel/types'
import { BetaIcon } from '@/components/BetaBadge'
import { ChevronLeft, ChevronRight } from '@/icons'

const CardContainer = ({
  cardList,
  removeCard,
  message,
  addCard,
  addDisabled,
  mutate,
}: {
  cardList: Array<ICardData>
  removeCard: (recruit_id: number) => void
  message: string
  addCard?: () => void
  addDisabled?: boolean
  mutate: Dispatch<SetStateAction<ICardData[]>>
}) => {
  const { isPc, isTablet } = useMedia()
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      sx={
        isPc && !isTablet
          ? containerStyle.cardContainerPCStyle
          : containerStyle.cardContainerMobileStyle
      }
      direction={'column'}
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
          mb: '0.875rem',
          position: 'relative',
          zIndex: 100,
          flexGrow: [1, 0],
        }}
      >
        {!message ? (
          <CardStack
            cardList={cardList}
            removeCard={removeCard}
            addCard={addCard}
            mutate={mutate}
          />
        ) : (
          <Typography variant="CaptionEmphasis">{message}</Typography>
        )}
      </Stack>
      <Stack
        direction={'row'}
        width={'30%'}
        display={'flex'}
        justifyContent={'space-between'}
      >
        {isTablet && isPc && (
          <IconButton
            sx={style.buttonStyle}
            onClick={addCard}
            disabled={!!addDisabled}
          >
            <ChevronLeft
              sx={{ ...style.buttonIconStyle, color: 'text.alternative' }}
            />
          </IconButton>
        )}
        {isTablet && isPc && (
          <IconButton
            sx={style.buttonStyle}
            onClick={() => removeCard(cardList[cardList.length - 1]?.id)}
            disabled={cardList.length === 1}
          >
            <ChevronRight
              sx={{ ...style.buttonIconStyle, color: 'text.alternative' }}
            />
          </IconButton>
        )}
      </Stack>
    </Stack>
  )
}

export default CardContainer
