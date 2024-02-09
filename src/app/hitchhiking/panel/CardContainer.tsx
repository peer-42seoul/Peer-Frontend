'use client'

import React from 'react'
import { FormControlLabel, IconButton, Stack, Typography } from '@mui/material'
import CuTypeToggle from '@/components/CuTypeToggle'
import Interest from './Interest'
import * as containerStyle from './CardContainer.style'
import CardStack from './CardStack'
import { IPostCardHitchhiking } from '@/types/IPostCard'
import { BetaIcon } from '@/components/BetaBadge'
import * as style from '../hitchhiking.style'
import useMedia from '@/hook/useMedia'
import { ChevronLeft, ChevronRight } from '@/icons'

const CardContainer = ({
  cardList,
  removeCard,
  isProject,
  message,
  handleChange,
  addCard,
  addDisabled,
  setCardList,
}: {
  cardList: Array<IPostCardHitchhiking>
  removeCard: (recruit_id: number) => void
  isProject: boolean
  message: string
  handleChange: any
  addCard?: () => void
  addDisabled?: boolean
  setCardList: React.Dispatch<React.SetStateAction<IPostCardHitchhiking[]>>
}) => {
  const { isPc } = useMedia()

  const setFavorite = () => {
    setCardList((prev) => {
      const newArray = [...prev]
      newArray[prev.length - 1].favorite =
        newArray[prev.length - 1].favorite === undefined
          ? true
          : !newArray[prev.length - 1].favorite
      return newArray
    })
  }

  return (
    <Stack
      justifyContent={'flex-start'}
      alignItems={'center'}
      sx={containerStyle.cardContainerStyle}
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
          히치하이킹
        </Typography>
        <BetaIcon />
      </Stack>
      <Stack
        sx={containerStyle.toggleContainerStyle}
        justifyContent={'center'}
        alignItems={'center'}
        direction={'row'}
        spacing={'0.5rem'}
      >
        <Typography
          variant="Caption"
          color={!isProject ? 'purple.normal' : 'text.assistive'}
          sx={{ transition: 'color 0.5s ease' }}
        >
          스터디
        </Typography>
        <FormControlLabel
          control={<CuTypeToggle checked={isProject} onChange={handleChange} />}
          label={''}
        />
        <Typography
          variant="Caption"
          color={isProject ? 'purple.normal' : 'text.assistive'}
          sx={{ transition: 'color 0.5s ease' }}
        >
          프로젝트
        </Typography>
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
            isProject={isProject}
          />
        ) : (
          <Typography variant="CaptionEmphasis">{message}</Typography>
        )}
      </Stack>
      <Stack
        direction={'row'}
        // spacing={'0.5rem'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
        sx={{ width: '100%' }}
      >
        {!isPc && (
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
        <Interest
          id={cardList[cardList.length - 1]?.recruitId}
          favorite={cardList[cardList.length - 1]?.favorite || false}
          setFavorite={setFavorite}
        />
        {!isPc && (
          <IconButton
            sx={style.buttonStyle}
            onClick={() => removeCard(cardList[cardList.length - 1]?.recruitId)}
            disabled={cardList.length === 0}
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
